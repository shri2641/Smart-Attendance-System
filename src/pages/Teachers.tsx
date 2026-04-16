import { useState } from "react";
import { Search, Plus, MoreVertical, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const teacherData = [
  { id: 1, name: "Dr. Rajesh Kumar", subject: "Mathematics", classes: "10-A, 10-B", phone: "9876543220", rating: 4.8 },
  { id: 2, name: "Mrs. Sunita Verma", subject: "English", classes: "10-A, 9-A", phone: "9876543221", rating: 4.6 },
  { id: 3, name: "Mr. Amit Joshi", subject: "Science", classes: "10-B, 9-B", phone: "9876543222", rating: 4.9 },
  { id: 4, name: "Ms. Deepa Nair", subject: "Hindi", classes: "10-A, 10-B", phone: "9876543223", rating: 4.5 },
  { id: 5, name: "Mr. Suresh Reddy", subject: "Social Studies", classes: "9-A, 9-B", phone: "9876543224", rating: 4.7 },
  { id: 6, name: "Mrs. Lakshmi Iyer", subject: "Computer Science", classes: "10-A, 10-B", phone: "9876543225", rating: 4.8 },
];

const Teachers = () => {
  const [search, setSearch] = useState("");
  const filtered = teacherData.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Teachers</h2>
        <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Add Teacher
        </Button>
      </div>

      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search teachers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div key={t.id} className="bg-card rounded-lg border border-border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.subject}</p>
                </div>
              </div>
              <button className="p-1 hover:bg-muted rounded"><MoreVertical className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>Classes: <span className="text-foreground font-medium">{t.classes}</span></p>
              <p>Phone: <span className="text-foreground font-medium">{t.phone}</span></p>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
              <span className="text-sm font-semibold text-foreground">{t.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
