import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, GraduationCap, UserCheck, BookOpen,
  ClipboardCheck, FileText, Calendar, UserCircle, Settings, Wifi
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/students", icon: Users, label: "Students" },
  { to: "/teachers", icon: GraduationCap, label: "Teachers" },
  { to: "/parents", icon: UserCheck, label: "Parents" },
  { to: "/attendance", icon: ClipboardCheck, label: "Attendance" },
  { to: "/nfc-tap", icon: Wifi, label: "NFC Tap Station" },
  { to: "/timetable", icon: Calendar, label: "Timetable" },
  { to: "/library", icon: BookOpen, label: "Library" },
  { to: "/exams", icon: FileText, label: "Exams" },
  { to: "/account", icon: UserCircle, label: "Account" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen flex-shrink-0 text-sidebar-fg p-4 flex flex-col border-r border-border/10 transition-colors" style={{ background: "var(--gradient-sidebar)" }}>
      <div className="flex items-center gap-3 mb-8 px-3">
        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.5)]">
          <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold tracking-tight text-sidebar-fg">Smart Attandance</span>
      </div>

      <nav className="flex flex-col gap-1.5 flex-1">
        <div className="text-xs font-semibold text-sidebar-fg/40 uppercase tracking-wider mb-2 px-3 mt-4">Main Menu</div>
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary shadow-[inset_2px_0_0_0_hsl(var(--primary))]"
                  : "text-sidebar-fg/60 hover:bg-white/5 hover:text-sidebar-fg"
              }`}
            >
              <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-primary' : 'text-sidebar-fg/50'}`} />
              {label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AppSidebar;
