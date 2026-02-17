import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import depeerLogo from "@/assets/depeer-logo.png";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  navItems: { to: string; label: string; icon: LucideIcon }[];
  accent?: string;
}

const DashboardLayout = ({ children, title, navItems }: DashboardLayoutProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-col bg-card border-r border-border/50 shrink-0">
        <div className="p-6">
          <Link to="/"><img src={depeerLogo} alt="DePeer" className="h-7" /></Link>
          <p className="text-xs text-muted-foreground mt-1">{title}</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/50">
          <Link to="/login" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between border-b border-border/50 bg-card px-4 py-3">
          <Link to="/"><img src={depeerLogo} alt="DePeer" className="h-6" /></Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground p-1">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        {/* Mobile nav dropdown */}
        {mobileOpen && (
          <div className="lg:hidden bg-card border-b border-border/50 px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/login"
              className="block px-3 py-2 text-xs text-muted-foreground hover:text-primary"
            >
              Sign Out
            </Link>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
