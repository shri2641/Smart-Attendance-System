import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: "purple" | "yellow" | "green" | "blue";
}

const colorMap = {
  purple: "bg-stat-purple/10 text-stat-purple",
  yellow: "bg-stat-yellow/10 text-stat-yellow",
  green: "bg-stat-green/10 text-stat-green",
  blue: "bg-stat-blue/10 text-stat-blue",
};

const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => (
  <div className="bg-card/40 backdrop-blur-xl rounded-2xl border border-white/10 dark:border-white/5 p-6 flex items-center gap-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)] hover:border-white/20 transition-all duration-300 group animate-fade-in relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-inner ${colorMap[color]} transition-transform duration-300 group-hover:scale-110`}>
      <Icon className="w-7 h-7" />
    </div>
    <div className="relative z-10">
      <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-extrabold text-foreground tracking-tight">{value.toLocaleString()}</p>
    </div>
  </div>
);

export default StatCard;
