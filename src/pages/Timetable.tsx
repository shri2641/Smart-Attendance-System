import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";
import { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type Slot = { time: string; subject: string; teacher: string };
type SectionTimetable = Record<string, Slot[]>;

const sections: Record<string, SectionTimetable> = {
  "Class 10-A": {
    Monday: [
      { time: "8:00 - 8:45", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "8:45 - 9:30", subject: "English", teacher: "Ms. Gupta" },
      { time: "9:45 - 10:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "10:30 - 11:15", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "11:30 - 12:15", subject: "Social Studies", teacher: "Mr. Singh" },
      { time: "12:15 - 1:00", subject: "Computer Science", teacher: "Ms. Reddy" },
    ],
    Tuesday: [
      { time: "8:00 - 8:45", subject: "Science", teacher: "Mr. Patel" },
      { time: "8:45 - 9:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "9:45 - 10:30", subject: "English", teacher: "Ms. Gupta" },
      { time: "10:30 - 11:15", subject: "Physical Education", teacher: "Mr. Khan" },
      { time: "11:30 - 12:15", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "12:15 - 1:00", subject: "Art", teacher: "Ms. Joshi" },
    ],
    Wednesday: [
      { time: "8:00 - 8:45", subject: "English", teacher: "Ms. Gupta" },
      { time: "8:45 - 9:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "9:45 - 10:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "10:30 - 11:15", subject: "Computer Science", teacher: "Ms. Reddy" },
      { time: "11:30 - 12:15", subject: "Social Studies", teacher: "Mr. Singh" },
      { time: "12:15 - 1:00", subject: "Hindi", teacher: "Mrs. Verma" },
    ],
    Thursday: [
      { time: "8:00 - 8:45", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "8:45 - 9:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "9:45 - 10:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "10:30 - 11:15", subject: "English", teacher: "Ms. Gupta" },
      { time: "11:30 - 12:15", subject: "Physical Education", teacher: "Mr. Khan" },
      { time: "12:15 - 1:00", subject: "Social Studies", teacher: "Mr. Singh" },
    ],
    Friday: [
      { time: "8:00 - 8:45", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "8:45 - 9:30", subject: "Computer Science", teacher: "Ms. Reddy" },
      { time: "9:45 - 10:30", subject: "English", teacher: "Ms. Gupta" },
      { time: "10:30 - 11:15", subject: "Science", teacher: "Mr. Patel" },
      { time: "11:30 - 12:15", subject: "Art", teacher: "Ms. Joshi" },
      { time: "12:15 - 1:00", subject: "Hindi", teacher: "Mrs. Verma" },
    ],
    Saturday: [
      { time: "8:00 - 8:45", subject: "Science", teacher: "Mr. Patel" },
      { time: "8:45 - 9:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "9:45 - 10:30", subject: "Social Studies", teacher: "Mr. Singh" },
      { time: "10:30 - 11:15", subject: "English", teacher: "Ms. Gupta" },
    ],
  },
  "Class 10-B": {
    Monday: [
      { time: "8:00 - 8:45", subject: "Science", teacher: "Mr. Patel" },
      { time: "8:45 - 9:30", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "9:45 - 10:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "10:30 - 11:15", subject: "English", teacher: "Ms. Gupta" },
      { time: "11:30 - 12:15", subject: "Computer Science", teacher: "Ms. Reddy" },
      { time: "12:15 - 1:00", subject: "Social Studies", teacher: "Mr. Singh" },
    ],
    Tuesday: [
      { time: "8:00 - 8:45", subject: "English", teacher: "Ms. Gupta" },
      { time: "8:45 - 9:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "9:45 - 10:30", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "10:30 - 11:15", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "11:30 - 12:15", subject: "Art", teacher: "Ms. Joshi" },
      { time: "12:15 - 1:00", subject: "Physical Education", teacher: "Mr. Khan" },
    ],
    Wednesday: [
      { time: "8:00 - 8:45", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "8:45 - 9:30", subject: "English", teacher: "Ms. Gupta" },
      { time: "9:45 - 10:30", subject: "Social Studies", teacher: "Mr. Singh" },
      { time: "10:30 - 11:15", subject: "Science", teacher: "Mr. Patel" },
      { time: "11:30 - 12:15", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "12:15 - 1:00", subject: "Computer Science", teacher: "Ms. Reddy" },
    ],
    Thursday: [
      { time: "8:00 - 8:45", subject: "Social Studies", teacher: "Mr. Singh" },
      { time: "8:45 - 9:30", subject: "English", teacher: "Ms. Gupta" },
      { time: "9:45 - 10:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "10:30 - 11:15", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "11:30 - 12:15", subject: "Science", teacher: "Mr. Patel" },
      { time: "12:15 - 1:00", subject: "Physical Education", teacher: "Mr. Khan" },
    ],
    Friday: [
      { time: "8:00 - 8:45", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "8:45 - 9:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "9:45 - 10:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "10:30 - 11:15", subject: "Computer Science", teacher: "Ms. Reddy" },
      { time: "11:30 - 12:15", subject: "English", teacher: "Ms. Gupta" },
      { time: "12:15 - 1:00", subject: "Art", teacher: "Ms. Joshi" },
    ],
    Saturday: [
      { time: "8:00 - 8:45", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "8:45 - 9:30", subject: "English", teacher: "Ms. Gupta" },
      { time: "9:45 - 10:30", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "10:30 - 11:15", subject: "Science", teacher: "Mr. Patel" },
    ],
  },
  "Class 9-A": {
    Monday: [
      { time: "8:00 - 8:45", subject: "English", teacher: "Ms. Gupta" },
      { time: "8:45 - 9:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "9:45 - 10:30", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "10:30 - 11:15", subject: "Science", teacher: "Mr. Patel" },
      { time: "11:30 - 12:15", subject: "Art", teacher: "Ms. Joshi" },
      { time: "12:15 - 1:00", subject: "Social Studies", teacher: "Mr. Singh" },
    ],
    Tuesday: [
      { time: "8:00 - 8:45", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "8:45 - 9:30", subject: "Computer Science", teacher: "Ms. Reddy" },
      { time: "9:45 - 10:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "10:30 - 11:15", subject: "English", teacher: "Ms. Gupta" },
      { time: "11:30 - 12:15", subject: "Physical Education", teacher: "Mr. Khan" },
      { time: "12:15 - 1:00", subject: "Hindi", teacher: "Mrs. Verma" },
    ],
    Wednesday: [
      { time: "8:00 - 8:45", subject: "Science", teacher: "Mr. Patel" },
      { time: "8:45 - 9:30", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "9:45 - 10:30", subject: "English", teacher: "Ms. Gupta" },
      { time: "10:30 - 11:15", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "11:30 - 12:15", subject: "Computer Science", teacher: "Ms. Reddy" },
      { time: "12:15 - 1:00", subject: "Social Studies", teacher: "Mr. Singh" },
    ],
    Thursday: [
      { time: "8:00 - 8:45", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "8:45 - 9:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "9:45 - 10:30", subject: "Social Studies", teacher: "Mr. Singh" },
      { time: "10:30 - 11:15", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "11:30 - 12:15", subject: "English", teacher: "Ms. Gupta" },
      { time: "12:15 - 1:00", subject: "Art", teacher: "Ms. Joshi" },
    ],
    Friday: [
      { time: "8:00 - 8:45", subject: "Computer Science", teacher: "Ms. Reddy" },
      { time: "8:45 - 9:30", subject: "English", teacher: "Ms. Gupta" },
      { time: "9:45 - 10:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "10:30 - 11:15", subject: "Physical Education", teacher: "Mr. Khan" },
      { time: "11:30 - 12:15", subject: "Science", teacher: "Mr. Patel" },
      { time: "12:15 - 1:00", subject: "Hindi", teacher: "Mrs. Verma" },
    ],
    Saturday: [
      { time: "8:00 - 8:45", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "8:45 - 9:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "9:45 - 10:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "10:30 - 11:15", subject: "Social Studies", teacher: "Mr. Singh" },
    ],
  },
  "Class 9-B": {
    Monday: [
      { time: "8:00 - 8:45", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "8:45 - 9:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "9:45 - 10:30", subject: "English", teacher: "Ms. Gupta" },
      { time: "10:30 - 11:15", subject: "Computer Science", teacher: "Ms. Reddy" },
      { time: "11:30 - 12:15", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "12:15 - 1:00", subject: "Physical Education", teacher: "Mr. Khan" },
    ],
    Tuesday: [
      { time: "8:00 - 8:45", subject: "Social Studies", teacher: "Mr. Singh" },
      { time: "8:45 - 9:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "9:45 - 10:30", subject: "English", teacher: "Ms. Gupta" },
      { time: "10:30 - 11:15", subject: "Science", teacher: "Mr. Patel" },
      { time: "11:30 - 12:15", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "12:15 - 1:00", subject: "Art", teacher: "Ms. Joshi" },
    ],
    Wednesday: [
      { time: "8:00 - 8:45", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "8:45 - 9:30", subject: "Physical Education", teacher: "Mr. Khan" },
      { time: "9:45 - 10:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "10:30 - 11:15", subject: "English", teacher: "Ms. Gupta" },
      { time: "11:30 - 12:15", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "12:15 - 1:00", subject: "Computer Science", teacher: "Ms. Reddy" },
    ],
    Thursday: [
      { time: "8:00 - 8:45", subject: "English", teacher: "Ms. Gupta" },
      { time: "8:45 - 9:30", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "9:45 - 10:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "10:30 - 11:15", subject: "Social Studies", teacher: "Mr. Singh" },
      { time: "11:30 - 12:15", subject: "Science", teacher: "Mr. Patel" },
      { time: "12:15 - 1:00", subject: "Art", teacher: "Ms. Joshi" },
    ],
    Friday: [
      { time: "8:00 - 8:45", subject: "Science", teacher: "Mr. Patel" },
      { time: "8:45 - 9:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "9:45 - 10:30", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "10:30 - 11:15", subject: "English", teacher: "Ms. Gupta" },
      { time: "11:30 - 12:15", subject: "Social Studies", teacher: "Mr. Singh" },
      { time: "12:15 - 1:00", subject: "Computer Science", teacher: "Ms. Reddy" },
    ],
    Saturday: [
      { time: "8:00 - 8:45", subject: "English", teacher: "Ms. Gupta" },
      { time: "8:45 - 9:30", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "9:45 - 10:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "10:30 - 11:15", subject: "Mathematics", teacher: "Mr. Sharma" },
    ],
  },
  "Class 8-A": {
    Monday: [
      { time: "8:00 - 8:45", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "8:45 - 9:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "9:45 - 10:30", subject: "English", teacher: "Ms. Gupta" },
      { time: "10:30 - 11:15", subject: "Social Studies", teacher: "Mr. Singh" },
      { time: "11:30 - 12:15", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "12:15 - 1:00", subject: "Art", teacher: "Ms. Joshi" },
    ],
    Tuesday: [
      { time: "8:00 - 8:45", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "8:45 - 9:30", subject: "English", teacher: "Ms. Gupta" },
      { time: "9:45 - 10:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "10:30 - 11:15", subject: "Computer Science", teacher: "Ms. Reddy" },
      { time: "11:30 - 12:15", subject: "Science", teacher: "Mr. Patel" },
      { time: "12:15 - 1:00", subject: "Physical Education", teacher: "Mr. Khan" },
    ],
    Wednesday: [
      { time: "8:00 - 8:45", subject: "Science", teacher: "Mr. Patel" },
      { time: "8:45 - 9:30", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "9:45 - 10:30", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "10:30 - 11:15", subject: "English", teacher: "Ms. Gupta" },
      { time: "11:30 - 12:15", subject: "Art", teacher: "Ms. Joshi" },
      { time: "12:15 - 1:00", subject: "Social Studies", teacher: "Mr. Singh" },
    ],
    Thursday: [
      { time: "8:00 - 8:45", subject: "English", teacher: "Ms. Gupta" },
      { time: "8:45 - 9:30", subject: "Social Studies", teacher: "Mr. Singh" },
      { time: "9:45 - 10:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "10:30 - 11:15", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "11:30 - 12:15", subject: "Physical Education", teacher: "Mr. Khan" },
      { time: "12:15 - 1:00", subject: "Hindi", teacher: "Mrs. Verma" },
    ],
    Friday: [
      { time: "8:00 - 8:45", subject: "Social Studies", teacher: "Mr. Singh" },
      { time: "8:45 - 9:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "9:45 - 10:30", subject: "Computer Science", teacher: "Ms. Reddy" },
      { time: "10:30 - 11:15", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "11:30 - 12:15", subject: "Hindi", teacher: "Mrs. Verma" },
      { time: "12:15 - 1:00", subject: "English", teacher: "Ms. Gupta" },
    ],
    Saturday: [
      { time: "8:00 - 8:45", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "8:45 - 9:30", subject: "Science", teacher: "Mr. Patel" },
      { time: "9:45 - 10:30", subject: "English", teacher: "Ms. Gupta" },
      { time: "10:30 - 11:15", subject: "Hindi", teacher: "Mrs. Verma" },
    ],
  },
};

const sectionNames = Object.keys(sections);

const subjectColors: Record<string, string> = {
  Mathematics: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  English: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Science: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Hindi: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  "Social Studies": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "Computer Science": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  "Physical Education": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  Art: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
};

const Timetable = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [selectedSection, setSelectedSection] = useState(sectionNames[0]);
  const timetable = sections[selectedSection];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Timetable</h1>
          <p className="text-muted-foreground text-sm">Weekly class schedule — Monday to Saturday</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedSection} onValueChange={setSelectedSection}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sectionNames.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Today: {today}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {days.map((day) => (
          <Card key={day} className={`${day === today ? "ring-2 ring-primary" : ""}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                {day}
                {day === today && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Today</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {timetable[day].map((slot, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground w-24 text-xs shrink-0">{slot.time}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium flex-1 ${subjectColors[slot.subject] || "bg-muted text-muted-foreground"}`}>
                    {slot.subject}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
