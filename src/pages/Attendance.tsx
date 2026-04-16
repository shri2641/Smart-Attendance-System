import { useState, useEffect } from "react";
import { Check, X, Clock, Download, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

type Status = "present" | "absent" | "late" | "unmarked";

interface StudentWithAttendance {
  id: string;
  name: string;
  roll_no: string;
  class_section: string;
  nfc_card_id: string | null;
  status: Status;
  tap_time: string | null;
  method: string | null;
}

const statusConfig: Record<Status, { icon: typeof Check; label: string; className: string }> = {
  present: { icon: Check, label: "Present", className: "bg-green-100/60 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" },
  absent: { icon: X, label: "Absent", className: "bg-red-100/60 text-red-700 border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800" },
  late: { icon: Clock, label: "Late", className: "bg-yellow-100/60 text-yellow-700 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800" },
  unmarked: { icon: Clock, label: "Unmarked", className: "bg-muted text-muted-foreground border-border" },
};

const Attendance = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<StudentWithAttendance[]>([]);
  const [classSections, setClassSections] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  const loadData = async () => {
    setLoading(true);

    // Get all students
    const { data: studentsData } = await supabase
      .from("students")
      .select("*")
      .order("class_section")
      .order("roll_no");

    // Get today's attendance
    const { data: logsData } = await supabase
      .from("attendance_logs")
      .select("*")
      .eq("date", today);

    if (studentsData) {
      const sections = [...new Set(studentsData.map((s) => s.class_section))];
      setClassSections(sections);
      if (!selectedClass && sections.length > 0) setSelectedClass(sections[0]);

      const logsMap = new Map(logsData?.map((l) => [l.student_id, l]) || []);

      const merged: StudentWithAttendance[] = studentsData.map((s) => {
        const log = logsMap.get(s.id);
        return {
          id: s.id,
          name: s.name,
          roll_no: s.roll_no,
          class_section: s.class_section,
          nfc_card_id: s.nfc_card_id,
          status: log ? (log.status as Status) : "unmarked",
          tap_time: log ? log.tap_time : null,
          method: log ? log.method : null,
        };
      });

      setStudents(merged);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Real-time subscription for NFC taps
  useEffect(() => {
    const channel = supabase
      .channel("attendance-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "attendance_logs" }, () => {
        loadData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const markStatus = async (studentId: string, status: Status) => {
    if (status === "unmarked") return;

    const { error } = await supabase
      .from("attendance_logs")
      .upsert(
        { student_id: studentId, date: today, status, method: "manual", tap_time: new Date().toISOString() },
        { onConflict: "student_id,date" }
      );

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, status, tap_time: new Date().toISOString(), method: "manual" }
          : s
      )
    );
  };

  const markAll = async (status: "present" | "absent") => {
    const classStudents = students.filter((s) => s.class_section === selectedClass);
    const rows = classStudents.map((s) => ({
      student_id: s.id,
      date: today,
      status,
      method: "manual" as const,
      tap_time: new Date().toISOString(),
    }));

    const { error } = await supabase.from("attendance_logs").upsert(rows, { onConflict: "student_id,date" });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    setStudents((prev) =>
      prev.map((s) =>
        s.class_section === selectedClass
          ? { ...s, status, tap_time: new Date().toISOString(), method: "manual" }
          : s
      )
    );

    toast({ title: `Marked all ${selectedClass} as ${status}` });
  };

  const filtered = students.filter(
    (s) => s.class_section === selectedClass && s.name.toLowerCase().includes(search.toLowerCase())
  );

  const counts = filtered.reduce(
    (acc, s) => ({ ...acc, [s.status]: (acc[s.status] || 0) + 1 }),
    { present: 0, absent: 0, late: 0, unmarked: 0 } as Record<Status, number>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Attendance</h2>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/nfc-tap">
            <Button variant="default" size="sm" className="gap-2">
              <Wifi className="w-4 h-4" /> NFC Tap Station
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(["present", "absent", "late", "unmarked"] as Status[]).map((s) => {
          const cfg = statusConfig[s];
          return (
            <div key={s} className={`rounded-lg border p-3 text-center ${cfg.className}`}>
              <p className="text-2xl font-bold">{counts[s]}</p>
              <p className="text-xs font-medium">{cfg.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {classSections.map((cs) => (
              <SelectItem key={cs} value={cs}>Class {cs}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input placeholder="Search student..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-56" />
        <div className="ml-auto flex gap-2">
          <Button size="sm" variant="outline" onClick={() => markAll("present")} className="text-green-600 border-green-300 hover:bg-green-50 dark:hover:bg-green-950/20">
            Mark All Present
          </Button>
          <Button size="sm" variant="outline" onClick={() => markAll("absent")} className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-950/20">
            Mark All Absent
          </Button>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Roll No</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Student Name</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">NFC Card</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Method</th>
              <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground text-sm">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground text-sm">No students found</td></tr>
            ) : (
              filtered.map((student) => {
                const cfg = statusConfig[student.status];
                const Icon = cfg.icon;
                return (
                  <tr key={student.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono text-foreground">{student.roll_no}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
                          {student.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-foreground">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{student.nfc_card_id || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${cfg.className}`}>
                        <Icon className="w-3 h-3" /> {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {student.method && (
                        <Badge variant="outline" className="text-xs capitalize">
                          {student.method === "nfc" && <Wifi className="w-3 h-3 mr-1" />}
                          {student.method}
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => markStatus(student.id, "present")} className="p-1.5 rounded-md hover:bg-green-100 text-green-600 transition-colors dark:hover:bg-green-950/30" title="Present">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => markStatus(student.id, "absent")} className="p-1.5 rounded-md hover:bg-red-100 text-red-600 transition-colors dark:hover:bg-red-950/30" title="Absent">
                          <X className="w-4 h-4" />
                        </button>
                        <button onClick={() => markStatus(student.id, "late")} className="p-1.5 rounded-md hover:bg-yellow-100 text-yellow-600 transition-colors dark:hover:bg-yellow-950/30" title="Late">
                          <Clock className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
