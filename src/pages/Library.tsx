import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen } from "lucide-react";
import { useState } from "react";

const booksData = [
  { id: 1, title: "Mathematics for Class 10", author: "R.D. Sharma", category: "Mathematics", total: 50, available: 12, isbn: "978-0-13-110362-7" },
  { id: 2, title: "Science Textbook", author: "NCERT", category: "Science", total: 60, available: 25, isbn: "978-0-07-115011-7" },
  { id: 3, title: "English Grammar & Composition", author: "Wren & Martin", category: "English", total: 40, available: 8, isbn: "978-81-219-1546-1" },
  { id: 4, title: "History of Modern India", author: "Bipan Chandra", category: "Social Studies", total: 30, available: 18, isbn: "978-81-250-3684-5" },
  { id: 5, title: "Hindi Vyakaran", author: "Kamta Prasad Guru", category: "Hindi", total: 35, available: 20, isbn: "978-81-7011-697-4" },
  { id: 6, title: "Computer Fundamentals", author: "P.K. Sinha", category: "Computer Science", total: 25, available: 5, isbn: "978-81-7656-971-3" },
  { id: 7, title: "Physics for Beginners", author: "H.C. Verma", category: "Science", total: 45, available: 30, isbn: "978-81-7709-147-3" },
  { id: 8, title: "The Story of My Experiments with Truth", author: "M.K. Gandhi", category: "General", total: 20, available: 14, isbn: "978-0-486-24593-8" },
  { id: 9, title: "Wings of Fire", author: "A.P.J. Abdul Kalam", category: "General", total: 15, available: 3, isbn: "978-81-7371-146-6" },
  { id: 10, title: "Algebra Made Easy", author: "K.P. Basu", category: "Mathematics", total: 30, available: 22, isbn: "978-81-8318-123-4" },
];

const categoryColors: Record<string, string> = {
  Mathematics: "bg-purple-100 text-purple-700",
  Science: "bg-green-100 text-green-700",
  English: "bg-blue-100 text-blue-700",
  "Social Studies": "bg-orange-100 text-orange-700",
  Hindi: "bg-yellow-100 text-yellow-700",
  "Computer Science": "bg-indigo-100 text-indigo-700",
  General: "bg-gray-100 text-gray-700",
};

const Library = () => {
  const [search, setSearch] = useState("");
  const filtered = booksData.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Library</h1>
          <p className="text-muted-foreground text-sm">Browse available books and resources</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search books..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((book) => (
          <Card key={book.id}>
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-12 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground leading-tight">{book.title}</p>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${categoryColors[book.category] || "bg-muted text-muted-foreground"}`}>
                  {book.category}
                </span>
                <span className="text-xs text-muted-foreground">ISBN: {book.isbn}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t">
                <span className="text-xs text-muted-foreground">Total: {book.total}</span>
                <Badge variant={book.available > 10 ? "default" : book.available > 0 ? "secondary" : "destructive"} className="text-xs">
                  {book.available} available
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Library;
