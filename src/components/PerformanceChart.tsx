import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", govt: 80, private: 65, avg: 72 },
  { name: "Feb", govt: 75, private: 70, avg: 68 },
  { name: "Mar", govt: 85, private: 78, avg: 76 },
  { name: "Apr", govt: 90, private: 82, avg: 80 },
  { name: "May", govt: 88, private: 75, avg: 78 },
  { name: "Jun", govt: 92, private: 85, avg: 83 },
];

const PerformanceChart = () => (
  <div className="bg-card/40 backdrop-blur-xl rounded-2xl border border-white/10 dark:border-white/5 p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)] hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    <div className="relative z-10">
      <h3 className="text-lg font-bold text-foreground mb-6 tracking-tight">School Performance</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={4} barSize={12}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} dy={10} />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} dx={-10} />
          <Tooltip 
            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 20px -5px rgba(0,0,0,0.2)' }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: '20px' }} />
          <Bar dataKey="govt" name="Govt. School" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="private" name="Private School" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="avg" name="Average" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default PerformanceChart;
