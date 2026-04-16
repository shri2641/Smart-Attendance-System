import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Phone, Mail, Search, User } from "lucide-react";
import { useState } from "react";

const parentsData = [
  { id: 1, name: "Mr. Rajesh Kumar", phone: "+91 98765 43210", email: "rajesh.k@email.com", children: ["Aarav Kumar (Class 10-A)", "Priya Kumar (Class 7-B)"], occupation: "Engineer" },
  { id: 2, name: "Mrs. Sunita Sharma", phone: "+91 87654 32109", email: "sunita.s@email.com", children: ["Rohit Sharma (Class 9-A)"], occupation: "Doctor" },
  { id: 3, name: "Mr. Vikram Singh", phone: "+91 76543 21098", email: "vikram.singh@email.com", children: ["Ananya Singh (Class 8-B)"], occupation: "Businessman" },
  { id: 4, name: "Mrs. Priya Patel", phone: "+91 65432 10987", email: "priya.p@email.com", children: ["Arjun Patel (Class 10-B)", "Meera Patel (Class 6-A)"], occupation: "Teacher" },
  { id: 5, name: "Mr. Anil Gupta", phone: "+91 54321 09876", email: "anil.g@email.com", children: ["Kavya Gupta (Class 9-B)"], occupation: "Advocate" },
  { id: 6, name: "Mrs. Neha Verma", phone: "+91 43210 98765", email: "neha.v@email.com", children: ["Ishaan Verma (Class 7-A)"], occupation: "Accountant" },
  { id: 7, name: "Mr. Suresh Reddy", phone: "+91 32109 87654", email: "suresh.r@email.com", children: ["Diya Reddy (Class 10-A)"], occupation: "Professor" },
  { id: 8, name: "Mrs. Kavita Joshi", phone: "+91 21098 76543", email: "kavita.j@email.com", children: ["Aditya Joshi (Class 8-A)", "Sneha Joshi (Class 5-B)"], occupation: "Architect" },
];

const Parents = () => {
  const [search, setSearch] = useState("");
  const filtered = parentsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.children.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Parents</h1>
          <p className="text-muted-foreground text-sm">Parent/guardian contact details & student associations</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search parents or students..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((parent) => (
          <Card key={parent.id}>
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{parent.name}</p>
                  <p className="text-xs text-muted-foreground">{parent.occupation}</p>
                </div>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-3.5 h-3.5" /> {parent.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-3.5 h-3.5" /> {parent.email}
                </div>
              </div>
              <div className="border-t pt-2">
                <p className="text-xs text-muted-foreground mb-1">Children:</p>
                {parent.children.map((child, i) => (
                  <span key={i} className="inline-block text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded mr-1 mb-1">{child}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Parents;
