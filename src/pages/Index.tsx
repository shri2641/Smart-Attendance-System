import { Building, Users, GraduationCap, UserCheck } from "lucide-react";
import StatCard from "@/components/StatCard";
import CalendarWidget from "@/components/CalendarWidget";
import PerformanceChart from "@/components/PerformanceChart";
import TopScorers from "@/components/TopScorers";
import ActivityFeed from "@/components/ActivityFeed";

const stats = [
  { icon: Building, label: "Schools", value: 6000, color: "purple" as const },
  { icon: Users, label: "Students", value: 24542, color: "yellow" as const },
  { icon: GraduationCap, label: "Teachers", value: 5000, color: "green" as const },
  { icon: UserCheck, label: "Parents", value: 10000, color: "blue" as const },
];

const Index = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CalendarWidget />
      <PerformanceChart />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ActivityFeed />
      <TopScorers />
    </div>
  </div>
);

export default Index;
