import { Trophy } from "lucide-react";

const scorers = [
  { name: "Aarav Sharma", score: 99.9, rank: 1 },
  { name: "Priya Patel", score: 99.76, rank: 2 },
  { name: "Rahul Singh", score: 99.5, rank: 3 },
];

const rankColors = ["bg-primary/10 text-primary border-primary/20", "bg-muted text-foreground border-border", "bg-accent text-accent-foreground border-border"];

const TopScorers = () => (
  <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold text-foreground tracking-tight">Top Scorers</h3>
      <span className="text-xs font-medium bg-muted px-2 py-1 rounded-full text-muted-foreground">2024-2025</span>
    </div>
    <div className="flex gap-4">
      {scorers.map((s, i) => (
        <div key={s.name} className={`flex-1 rounded-xl p-4 text-center border backdrop-blur-sm transition-transform hover:-translate-y-1 duration-300 ${rankColors[i]}`}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm ${i === 0 ? 'bg-primary/20 text-primary' : 'bg-background text-muted-foreground'}`}>
            <Trophy className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold truncate text-foreground">{s.name}</p>
          <p className="text-xl font-black mt-1">{s.score}%</p>
          <span className="text-xs font-medium opacity-80 uppercase tracking-wider mt-1 block">{i === 0 ? "1st Place" : i === 1 ? "2nd Place" : "3rd Place"}</span>
        </div>
      ))}
    </div>
  </div>
);

export default TopScorers;
