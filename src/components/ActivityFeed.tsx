const activities = [
  {
    school: "St. Xavier School",
    date: "02 Oct, 2024",
    text: "Annual parent-teacher meeting scheduled for next month. All parents and teachers are invited.",
  },
  {
    school: "Modern International School",
    date: "05 Oct, 2024",
    text: "Science fair registration open for students of class 6-12. Last date: 15th October.",
  },
  {
    school: "Green Valley Academy",
    date: "08 Oct, 2024",
    text: "Sports day practice begins next week. Students to report at 7 AM.",
  },
];

const ActivityFeed = () => (
  <div className="bg-card/40 backdrop-blur-xl rounded-2xl border border-white/10 dark:border-white/5 p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)] hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground tracking-tight">Activities & Notifications</h3>
        <button className="text-sm text-primary font-bold hover:underline">View All</button>
      </div>
      <div className="space-y-4">
        {activities.map((a, i) => (
          <div key={i} className="p-4 rounded-xl bg-muted/40 border border-white/5 hover:bg-muted/60 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1 sm:gap-0">
              <span className="text-sm font-bold text-foreground">{a.school}</span>
              <span className="text-xs font-semibold text-muted-foreground">{a.date}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{a.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ActivityFeed;
