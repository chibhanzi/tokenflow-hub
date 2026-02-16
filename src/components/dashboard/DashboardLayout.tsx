import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import depeerLogo from "@/assets/depeer-logo.png";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  navItems: { to: string; label: string; icon: LucideIcon }[];
  accent?: string;
}

const DashboardLayout = ({ children, title, navItems }: DashboardLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-secondary border-r border-border/30">
        <div className="p-6">
          <Link to="/"><img src={depeerLogo} alt="DePeer" className="h-7" /></Link>
          <p className="text-xs text-secondary-foreground/40 mt-1">{title}</p>
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
                    : "text-secondary-foreground/60 hover:text-secondary-foreground hover:bg-secondary-foreground/5"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/30">
          <Link to="/login" className="text-xs text-secondary-foreground/40 hover:text-primary transition-colors">
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col">
        <header className="lg:hidden flex items-center justify-between border-b border-border/30 bg-secondary px-4 py-3">
          <Link to="/"><img src={depeerLogo} alt="DePeer" className="h-6" /></Link>
          <div className="flex gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "text-xs whitespace-nowrap px-3 py-1.5 rounded-full transition-colors",
                    active ? "bg-primary/10 text-primary" : "text-secondary-foreground/50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
