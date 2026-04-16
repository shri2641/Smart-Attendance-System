import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, CheckCircle2, Clock, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  roll_no: string;
  class_section: string;
  nfc_card_id: string | null;
}

interface TapResult {
  student: Student;
  status: "present" | "late";
  time: string;
  method: string;
}

const NfcTapStation = () => {
  const { toast } = useToast();
  const [nfcSupported, setNfcSupported] = useState(false);
  const [nfcReading, setNfcReading] = useState(false);
  const [simulateId, setSimulateId] = useState("");
  const [recentTaps, setRecentTaps] = useState<TapResult[]>([]);
  const [lastTap, setLastTap] = useState<TapResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [todayCount, setTodayCount] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  // Check NFC support
  useEffect(() => {
    if ("NDEFReader" in window) {
      setNfcSupported(true);
    }
  }, []);

  // Load students and today's count
  useEffect(() => {
    const loadData = async () => {
      const { data: studentsData } = await supabase
        .from("students")
        .select("id, name, roll_no, class_section, nfc_card_id")
        .order("class_section")
        .order("roll_no");

      if (studentsData) {
        setStudents(studentsData);
        setTotalStudents(studentsData.length);
      }

      const today = new Date().toISOString().split("T")[0];
      const { count } = await supabase
        .from("attendance_logs")
        .select("*", { count: "exact", head: true })
        .eq("date", today);

      setTodayCount(count || 0);

      // Load recent taps for today
      const { data: logs } = await supabase
        .from("attendance_logs")
        .select("*, students(name, roll_no, class_section, nfc_card_id)")
        .eq("date", today)
        .order("tap_time", { ascending: false })
        .limit(10);

      if (logs) {
        const taps: TapResult[] = logs.map((log: any) => ({
          student: log.students,
          status: log.status as "present" | "late",
          time: new Date(log.tap_time).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          method: log.method,
        }));
        setRecentTaps(taps);
      }
    };
    loadData();
  }, []);

  const processAttendance = useCallback(async (nfcCardId: string, method: "nfc" | "simulation") => {
    setProcessing(true);
    try {
      // Find student by NFC card ID
      const { data: student, error: findError } = await supabase
        .from("students")
        .select("id, name, roll_no, class_section, nfc_card_id")
        .eq("nfc_card_id", nfcCardId)
        .maybeSingle();

      if (findError || !student) {
        toast({ title: "Unknown Card", description: `NFC Card ID "${nfcCardId}" is not registered.`, variant: "destructive" });
        setProcessing(false);
        return;
      }

      // Determine status based on time (before 9 AM = present, after = late)
      const now = new Date();
      const hour = now.getHours();
      const status = hour < 9 ? "present" : "late";
      const today = now.toISOString().split("T")[0];

      // Upsert attendance
      const { error: insertError } = await supabase
        .from("attendance_logs")
        .upsert(
          { student_id: student.id, date: today, status, method, tap_time: now.toISOString() },
          { onConflict: "student_id,date" }
        );

      if (insertError) {
        toast({ title: "Error", description: insertError.message, variant: "destructive" });
        setProcessing(false);
        return;
      }

      const tapResult: TapResult = {
        student,
        status: status as "present" | "late",
        time: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        method,
      };

      setLastTap(tapResult);
      setRecentTaps((prev) => [tapResult, ...prev.filter((t) => t.student.id !== student.id)].slice(0, 10));
      setTodayCount((prev) => prev + 1);

      toast({
        title: `✅ ${student.name} - ${status === "present" ? "Present" : "Late"}`,
        description: `${student.class_section} | Roll: ${student.roll_no} | ${tapResult.time}`,
      });

      // Clear last tap after 5 seconds
      setTimeout(() => setLastTap(null), 5000);
    } catch (err) {
      toast({ title: "Error", description: "Failed to process attendance.", variant: "destructive" });
    }
    setProcessing(false);
  }, [toast]);

  // Start NFC reading
  const startNfcReading = async () => {
    try {
      const ndef = new (window as any).NDEFReader();
      await ndef.scan();
      setNfcReading(true);
      toast({ title: "NFC Ready", description: "Waiting for card taps..." });

      ndef.addEventListener("reading", ({ serialNumber }: any) => {
        processAttendance(serialNumber, "nfc");
      });
    } catch (err) {
      toast({ title: "NFC Error", description: "Could not start NFC reader.", variant: "destructive" });
    }
  };

  // Simulate tap
  const handleSimulate = () => {
    const cardId = simulateId.trim() || (selectedStudent ? students.find((s) => s.id === selectedStudent)?.nfc_card_id : null);
    if (!cardId) {
      toast({ title: "Error", description: "Enter a card ID or select a student.", variant: "destructive" });
      return;
    }
    processAttendance(cardId, "simulation");
    setSimulateId("");
    setSelectedStudent("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">NFC Tap Station</h1>
          <p className="text-muted-foreground text-sm">Students tap their ID cards to mark attendance automatically</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-sm py-1 px-3">
            Today: {todayCount} / {totalStudents} marked
          </Badge>
          {nfcSupported ? (
            <Button onClick={startNfcReading} disabled={nfcReading} className="gap-2">
              {nfcReading ? <Wifi className="w-4 h-4 animate-pulse" /> : <WifiOff className="w-4 h-4" />}
              {nfcReading ? "NFC Active" : "Start NFC"}
            </Button>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              <WifiOff className="w-3 h-3 mr-1" /> NFC not available
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tap Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Last Tap Result */}
          {lastTap && (
            <Card className={`border-2 transition-all animate-fade-in ${lastTap.status === "present" ? "border-green-500 bg-green-50 dark:bg-green-950/20" : "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"}`}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${lastTap.status === "present" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"}`}>
                    {lastTap.student.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">{lastTap.student.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {lastTap.student.class_section} • Roll: {lastTap.student.roll_no}
                    </p>
                  </div>
                  <div className="text-right">
                    {lastTap.status === "present" ? (
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    ) : (
                      <Clock className="w-10 h-10 text-yellow-500" />
                    )}
                    <p className="text-sm font-semibold mt-1 capitalize">{lastTap.status}</p>
                    <p className="text-xs text-muted-foreground">{lastTap.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* NFC Waiting / Tap Visual */}
          {!lastTap && (
            <Card className="border-dashed border-2 border-muted-foreground/20">
              <CardContent className="py-16 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Smartphone className={`w-12 h-12 text-primary ${nfcReading ? "animate-pulse" : ""}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {nfcReading ? "Waiting for NFC Tap..." : "Ready for Attendance"}
                </h3>
                <p className="text-muted-foreground text-sm max-w-md">
                  {nfcReading
                    ? "Hold the student ID card near the device to mark attendance"
                    : "Start NFC reading or use the simulation panel below to mark attendance"}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Simulation Panel */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Smartphone className="w-4 h-4" /> Simulate NFC Tap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-xs text-muted-foreground mb-1 block">Select Student</label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a student..." />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name} ({s.class_section} - {s.roll_no})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-xs text-muted-foreground self-center">or</div>
                <div className="flex-1 min-w-[150px]">
                  <label className="text-xs text-muted-foreground mb-1 block">NFC Card ID</label>
                  <Input
                    placeholder="e.g. NFC-10A-001"
                    value={simulateId}
                    onChange={(e) => setSimulateId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSimulate()}
                  />
                </div>
                <Button onClick={handleSimulate} disabled={processing} className="gap-2">
                  {processing ? <Clock className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Tap
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Taps */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Taps Today</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTaps.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No taps recorded today</p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {recentTaps.map((tap, i) => (
                  <div key={`${tap.student.id}-${i}`} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
                      {tap.student.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{tap.student.name}</p>
                      <p className="text-xs text-muted-foreground">{tap.student.class_section} • {tap.time}</p>
                    </div>
                    <Badge
                      variant={tap.status === "present" ? "default" : "secondary"}
                      className={`text-xs ${tap.status === "present" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"}`}
                    >
                      {tap.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NfcTapStation;
