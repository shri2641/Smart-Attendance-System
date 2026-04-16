import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, AlertTriangle } from "lucide-react";

const upcomingExams = [
  { id: 1, subject: "Mathematics", date: "2026-04-20", time: "9:00 AM - 12:00 PM", type: "Mid-Term", class: "Class 10", syllabus: "Algebra, Trigonometry, Geometry" },
  { id: 2, subject: "Science", date: "2026-04-22", time: "9:00 AM - 12:00 PM", type: "Mid-Term", class: "Class 10", syllabus: "Physics: Motion & Force, Chemistry: Acids & Bases" },
  { id: 3, subject: "English", date: "2026-04-24", time: "9:00 AM - 11:30 AM", type: "Mid-Term", class: "Class 10", syllabus: "Grammar, Comprehension, Essay Writing" },
  { id: 4, subject: "Hindi", date: "2026-04-26", time: "9:00 AM - 11:30 AM", type: "Mid-Term", class: "Class 10", syllabus: "व्याकरण, निबंध, पत्र लेखन" },
  { id: 5, subject: "Social Studies", date: "2026-04-28", time: "9:00 AM - 12:00 PM", type: "Mid-Term", class: "Class 10", syllabus: "History: Freedom Movement, Geography: Resources" },
  { id: 6, subject: "Computer Science", date: "2026-04-30", time: "10:00 AM - 12:00 PM", type: "Unit Test", class: "Class 9", syllabus: "Python Basics, Data Types, Loops" },
  { id: 7, subject: "Mathematics", date: "2026-05-05", time: "9:00 AM - 12:00 PM", type: "Unit Test", class: "Class 8", syllabus: "Fractions, Decimals, Linear Equations" },
  { id: 8, subject: "Science", date: "2026-05-07", time: "9:00 AM - 11:00 AM", type: "Quiz", class: "Class 7", syllabus: "Plant & Animal Cells, Photosynthesis" },
];

const typeColors: Record<string, string> = {
  "Mid-Term": "bg-purple-100 text-purple-700",
  "Unit Test": "bg-blue-100 text-blue-700",
  Quiz: "bg-green-100 text-green-700",
  Final: "bg-red-100 text-red-700",
};

const getDaysLeft = (dateStr: string) => {
  const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return diff;
};

const Exams = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Upcoming Tests & Exams</h1>
      <p className="text-muted-foreground text-sm">Exam schedule, syllabus, and dates</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {upcomingExams.map((exam) => {
        const daysLeft = getDaysLeft(exam.date);
        return (
          <Card key={exam.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{exam.subject}</CardTitle>
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${typeColors[exam.type] || "bg-muted text-muted-foreground"}`}>
                  {exam.type}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {new Date(exam.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {exam.time}</span>
              </div>
              <p className="text-xs text-muted-foreground">{exam.class}</p>
              <div className="border-t pt-2">
                <p className="text-xs text-muted-foreground"><span className="font-medium">Syllabus:</span> {exam.syllabus}</p>
              </div>
              <div className="flex justify-end">
                {daysLeft > 0 ? (
                  <Badge variant={daysLeft <= 3 ? "destructive" : "secondary"} className="text-xs flex items-center gap-1">
                    {daysLeft <= 3 && <AlertTriangle className="w-3 h-3" />}
                    {daysLeft} day{daysLeft !== 1 ? "s" : ""} left
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">Completed</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
);

export default Exams;
