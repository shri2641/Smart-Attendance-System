import { Search, Bell, MessageSquare, AlertCircle, Calendar, Send, User, LogOut, LogIn, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopBar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
    <div className="flex items-center gap-4">
      <h1 className="text-lg font-semibold text-foreground">Welcome to <span className="text-primary font-bold">Smart</span></h1>
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search..." className="pl-9 bg-muted/50 border-0 h-9 transition-colors focus-visible:bg-muted" />
      </div>
    </div>
    <div className="flex items-center gap-3">
      <ThemeToggle />
      
      {/* Alerts / Notifications */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive border-2 border-card rounded-full animate-pulse" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-0 overflow-hidden border-border/50 shadow-lg bg-card/95 backdrop-blur-xl rounded-xl">
          <div className="px-4 py-3 border-b border-border/50 bg-muted/30">
            <h3 className="font-bold text-foreground">Notifications</h3>
          </div>
          <div className="p-2 flex flex-col gap-1">
            <div className="flex gap-3 items-start p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer group">
              <div className="bg-destructive/10 p-2 rounded-full mt-0.5 group-hover:bg-destructive/20 transition-colors">
                <AlertCircle className="w-4 h-4 text-destructive" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground leading-tight">Student Absent</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">Aarav Sharma (10-A) was not present today.</p>
                <span className="text-[10px] font-medium text-muted-foreground/70 mt-2 block">10 mins ago</span>
              </div>
            </div>
            
            <div className="flex gap-3 items-start p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer group">
              <div className="bg-primary/10 p-2 rounded-full mt-0.5 group-hover:bg-primary/20 transition-colors">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground leading-tight">Exam Alert</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">Mid-term exams coming next week. Please submit question papers.</p>
                <span className="text-[10px] font-medium text-muted-foreground/70 mt-2 block">1 hour ago</span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Teacher-Principal Chat */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary relative">
            <MessageSquare className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary border-2 border-card rounded-full" />
          </button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[500px] flex flex-col border-l-border/50 bg-card/95 backdrop-blur-xl p-0">
          <SheetHeader className="px-6 py-4 border-b border-border/50 bg-muted/20 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-lg font-bold">Principal's Office</SheetTitle>
                <SheetDescription className="text-xs font-medium">
                  Direct communication channel
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex flex-col gap-4">
              
              {/* Teacher Message 1 */}
              <div className="flex flex-col items-end">
                <div className="bg-primary text-primary-foreground p-3.5 rounded-2xl rounded-tr-sm shadow-sm max-w-[85%]">
                  <p className="text-sm">Requesting approval for an extra class for 10-A mathematics this Saturday.</p>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1.5 font-medium mr-1">09:30 AM</span>
              </div>
              
              {/* Principal Reply 1 */}
              <div className="flex flex-col items-start">
                <div className="bg-muted border border-border/50 p-3.5 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%]">
                  <p className="text-sm text-foreground">Approved. Please ensure the students are informed via the portal.</p>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1.5 font-medium ml-1">09:45 AM</span>
              </div>
              
              {/* Teacher Message 2 */}
              <div className="flex flex-col items-end">
                <div className="bg-primary text-primary-foreground p-3.5 rounded-2xl rounded-tr-sm shadow-sm max-w-[85%]">
                  <p className="text-sm">Noted. Also, there is an issue with the issued books in the library for the upcoming project.</p>
                  <p className="text-sm mt-2">Can we discuss the break section schedule to accommodate library time?</p>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1.5 font-medium mr-1">10:15 AM</span>
              </div>

            </div>
          </div>
          
          <div className="p-4 border-t border-border/50 bg-muted/10 flex gap-3 items-center">
            <Input 
              placeholder="Type your message..." 
              className="flex-1 bg-background border-border/50 shadow-sm focus-visible:ring-primary rounded-full px-4" 
            />
            <Button size="icon" className="bg-primary hover:bg-primary/90 shadow-md rounded-full w-10 h-10 shrink-0">
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-[0_0_10px_rgba(var(--primary),0.3)] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-primary transition-transform hover:scale-105">
            {isAuthenticated && user?.picture ? (
              <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
            ) : isAuthenticated ? (
              user?.name?.charAt(0).toUpperCase() || 'A'
            ) : (
              <User className="w-4 h-4" />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-border/50">
          {isAuthenticated ? (
            <>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem 
                className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-foreground">Guest User</p>
                  <p className="text-xs leading-none text-muted-foreground">Sign in to access your account</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => loginWithRedirect()}
              >
                <LogIn className="mr-2 h-4 w-4" />
                <span>Log In</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Sign Up</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
  );
};

export default TopBar;
