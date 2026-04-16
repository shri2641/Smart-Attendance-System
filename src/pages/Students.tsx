import { useState } from "react";
import { Search, Plus, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const studentData = [
  { id: 1, name: "Aarav Sharma", rollNo: "001", class: "10-A", gender: "Male", phone: "9876543210", attendance: 95 },
  { id: 2, name: "Priya Patel", rollNo: "002", class: "10-A", gender: "Female", phone: "9876543211", attendance: 92 },
  { id: 3, name: "Rahul Singh", rollNo: "003", class: "10-A", gender: "Male", phone: "9876543212", attendance: 88 },
  { id: 4, name: "Sneha Gupta", rollNo: "004", class: "10-A", gender: "Female", phone: "9876543213", attendance: 96 },
  { id: 5, name: "Vikram Kumar", rollNo: "005", class: "10-A", gender: "Male", phone: "9876543214", attendance: 78 },
  { id: 6, name: "Ananya Reddy", rollNo: "006", class: "10-B", gender: "Female", phone: "9876543215", attendance: 91 },
  { id: 7, name: "Karan Mehta", rollNo: "007", class: "10-B", gender: "Male", phone: "9876543216", attendance: 85 },
  { id: 8, name: "Divya Nair", rollNo: "008", class: "10-B", gender: "Female", phone: "9876543217", attendance: 97 },
  { id: 9, name: "Rohan Desai", rollNo: "009", class: "10-B", gender: "Male", phone: "9876543218", attendance: 89 },
  { id: 10, name: "Kavya Joshi", rollNo: "010", class: "10-B", gender: "Female", phone: "9876543219", attendance: 94 },
  { id: 11, name: "Arjun Verma", rollNo: "011", class: "10-C", gender: "Male", phone: "9876543220", attendance: 82 },
  { id: 12, name: "Neha Iyer", rollNo: "012", class: "10-C", gender: "Female", phone: "9876543221", attendance: 99 },
  { id: 13, name: "Aditya Rao", rollNo: "013", class: "10-C", gender: "Male", phone: "9876543222", attendance: 87 },
  { id: 14, name: "Meera Menon", rollNo: "014", class: "10-C", gender: "Female", phone: "9876543223", attendance: 93 },
  { id: 15, name: "Ishaan Kapoor", rollNo: "015", class: "10-C", gender: "Male", phone: "9876543224", attendance: 76 },
  { id: 16, name: "Diya Bhatia", rollNo: "016", class: "10-D", gender: "Female", phone: "9876543225", attendance: 95 },
  { id: 17, name: "Dev Chauhan", rollNo: "017", class: "10-D", gender: "Male", phone: "9876543226", attendance: 90 },
  { id: 18, name: "Riya Ahuja", rollNo: "018", class: "10-D", gender: "Female", phone: "9876543227", attendance: 84 },
  { id: 19, name: "Yash Agarwal", rollNo: "019", class: "10-D", gender: "Male", phone: "9876543228", attendance: 98 },
  { id: 20, name: "Tanvi Saxena", rollNo: "020", class: "10-D", gender: "Female", phone: "9876543229", attendance: 91 },
];

const Students = () => {
  const [search, setSearch] = useState("");
  const filtered = studentData.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Students Directory</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage and view student records ({studentData.length} total)</p>
        </div>
        <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all rounded-full px-6 font-semibold">
          <Plus className="w-4 h-4" /> Add Student
        </Button>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search students by name..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-card/50 backdrop-blur-sm border-border/50 shadow-sm focus-visible:ring-primary rounded-full h-10" />
      </div>

      <div className="bg-card/40 backdrop-blur-xl rounded-2xl border border-border/50 shadow-sm overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30 backdrop-blur-md">
                {["Roll No", "Name", "Class", "Gender", "Phone", "Attendance", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-border/50 last:border-0 hover:bg-muted/40 transition-colors group">
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground font-medium">{s.rollNo}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-bold shadow-sm group-hover:scale-105 transition-transform">{s.name.charAt(0)}</div>
                      <span className="text-sm font-bold text-foreground">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground border border-secondary-foreground/10">{s.class}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-muted-foreground">{s.gender}</td>
                  <td className="px-6 py-4 text-sm font-medium text-muted-foreground">{s.phone}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-muted/50 rounded-full overflow-hidden border border-border/50 shadow-inner">
                        <div className={`h-full rounded-full transition-all duration-500 ease-in-out ${s.attendance >= 90 ? "bg-emerald-500" : s.attendance >= 80 ? "bg-amber-500" : "bg-rose-500"}`} style={{ width: `${s.attendance}%` }} />
                      </div>
                      <span className="text-sm font-bold text-foreground">{s.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-background rounded-xl transition-colors shadow-sm opacity-0 group-hover:opacity-100 border border-transparent hover:border-border"><MoreVertical className="w-4 h-4 text-muted-foreground" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Students;
