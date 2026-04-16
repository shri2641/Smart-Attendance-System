import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const navigate = (dir: number) => {
    setCurrentDate(new Date(year, month + dir, 1));
  };

  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  // Mock attendance data
  const presentDays = [2, 5, 7, 10, 12, 14, 17, 19, 21, 24, 26];
  const absentDays = [3, 11, 23, 28];

  return (
    <div className="bg-card/40 backdrop-blur-xl rounded-2xl border border-white/10 dark:border-white/5 p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)] hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground tracking-tight">Calendar & Attendance</h3>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
              <ChevronLeft className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
            <span className="text-sm font-bold w-24 text-center">{monthName}</span>
            <button onClick={() => navigate(1)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
              <ChevronRight className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center mb-2">
          {DAYS.map((d) => (
            <div key={d} className="text-xs font-bold text-muted-foreground/70 uppercase tracking-wider py-1">{d}</div>
          ))}
          {cells.map((day, i) => (
            <div key={i} className="py-1">
              {day && (
                <span
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-sm transition-all duration-300 ${
                    isToday(day)
                      ? "bg-primary text-primary-foreground font-bold shadow-[0_0_15px_rgba(var(--primary),0.5)] scale-110"
                      : presentDays.includes(day)
                      ? "bg-success/20 text-success font-semibold shadow-inner"
                      : absentDays.includes(day)
                      ? "bg-destructive/20 text-destructive font-semibold shadow-inner"
                      : "text-foreground hover:bg-white/10 hover:scale-110 font-medium"
                  }`}
                >
                  {day}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-6 mt-6 text-xs font-semibold text-muted-foreground justify-center">
          <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_8px_rgba(var(--success),0.6)]" /> Present</span>
          <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-destructive shadow-[0_0_8px_rgba(var(--destructive),0.6)]" /> Absent</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
