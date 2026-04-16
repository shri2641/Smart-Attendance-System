import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "@/components/DashboardLayout";
import Index from "./pages/Index";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Attendance from "./pages/Attendance";
import NfcTapStation from "./pages/NfcTapStation";
import Parents from "./pages/Parents";
import Library from "./pages/Library";
import Timetable from "./pages/Timetable";
import Exams from "./pages/Exams";
import Account from "./pages/Account";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

import { ThemeProvider } from "@/components/ThemeProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="smart-attendance-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/students" element={<Students />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/nfc-tap" element={<NfcTapStation />} />
                <Route path="/parents" element={<Parents />} />
                <Route path="/library" element={<Library />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/exams" element={<Exams />} />
                <Route path="/account" element={<Account />} />
                <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
