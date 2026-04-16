import { ChevronRight, Camera } from "lucide-react";

const Account = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-foreground mb-8 tracking-tight">Account Settings</h1>

      {/* Basic Info Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-foreground mb-6">Basic info</h2>
        
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-2 sm:p-6 shadow-sm">
          
          {/* Profile Picture Row */}
          <div className="flex flex-col sm:flex-row sm:items-center py-6 px-4 border-b border-border/50 gap-4 sm:gap-0 transition-colors rounded-xl">
            <div className="sm:w-1/3">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Profile Picture</span>
            </div>
            <div className="sm:w-2/3 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center border-2 border-border group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces" 
                    alt="Profile" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <button className="text-sm font-semibold text-foreground hover:text-primary transition-colors text-left">Upload new picture</button>
                  <button className="text-sm font-medium text-destructive hover:text-destructive/80 transition-colors text-left">Remove</button>
                </div>
              </div>
            </div>
          </div>

          {/* Name Row */}
          <div className="flex items-center py-5 px-4 border-b border-border/50 hover:bg-muted/20 transition-colors rounded-xl cursor-pointer group">
            <div className="w-1/3">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Name</span>
            </div>
            <div className="w-2/3 flex items-center justify-between">
              <span className="text-base font-bold text-foreground">Ananya Sharma</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Date of Birth Row */}
          <div className="flex items-center py-5 px-4 border-b border-border/50 hover:bg-muted/20 transition-colors rounded-xl cursor-pointer group">
            <div className="w-1/3">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Date of Birth</span>
            </div>
            <div className="w-2/3 flex items-center justify-between">
              <span className="text-base font-bold text-foreground">August 15, 1995</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Gender Row */}
          <div className="flex items-center py-5 px-4 border-b border-border/50 hover:bg-muted/20 transition-colors rounded-xl cursor-pointer group">
            <div className="w-1/3">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Gender</span>
            </div>
            <div className="w-2/3 flex items-center justify-between">
              <span className="text-base font-bold text-foreground">Female</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Email Row */}
          <div className="flex items-center py-5 px-4 hover:bg-muted/20 transition-colors rounded-xl cursor-pointer group">
            <div className="w-1/3">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Email</span>
            </div>
            <div className="w-2/3 flex items-center justify-between">
              <span className="text-base font-bold text-foreground">ananya.sharma@email.com</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>

        </div>
      </div>

      {/* Account Info Section */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-6">Account info</h2>
        
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-2 sm:p-6 shadow-sm">
          
          {/* Username Row */}
          <div className="flex items-center py-5 px-4 border-b border-border/50 hover:bg-muted/20 transition-colors rounded-xl cursor-pointer group">
            <div className="w-1/3">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Username</span>
            </div>
            <div className="w-2/3 flex items-center justify-between">
              <span className="text-base font-bold text-foreground">ananyasharma95</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Password Row */}
          <div className="flex items-center py-5 px-4 hover:bg-muted/20 transition-colors rounded-xl cursor-pointer group">
            <div className="w-1/3">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Password</span>
            </div>
            <div className="w-2/3 flex items-center justify-between">
              <span className="text-base font-bold text-foreground tracking-[0.2em] mt-1">•••••••••</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Account;