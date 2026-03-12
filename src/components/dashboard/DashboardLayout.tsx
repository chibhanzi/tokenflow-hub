import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon, Menu, X, UserCircle, Settings } from "lucide-react";
import { useState } from "react";
import depeerLogo from "@/assets/depeer-logo.png";
import NotificationPanel from "@/components/notifications/NotificationPanel";
import CurrencySelector from "@/components/CurrencySelector";
import WalletBadge from "@/components/wallet/WalletBadge";

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
      <aside className="hidden lg:flex w-64 flex-col bg-[hsl(220,35%,12%)] border-r border-white/10 shrink-0">
        <div className="p-6">
          <Link to="/"><img src={depeerLogo} alt="DePeer" className="h-7 brightness-0 invert" /></Link>
          <p className="text-xs text-white/50 mt-1">{title}</p>
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
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <WalletBadge />
            <NotificationPanel />
          </div>
          <CurrencySelector className="w-full h-8 text-xs bg-[hsl(220,35%,18%)] border-white/10 text-white/70 hover:bg-[hsl(220,35%,22%)]" />
          <div className="flex items-center justify-between">
            <Link to="/login" className="text-xs text-white/50 hover:text-white transition-colors">
              Sign Out
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between border-b border-white/10 bg-[hsl(220,35%,12%)] px-4 py-3">
          <Link to="/"><img src={depeerLogo} alt="DePeer" className="h-6 brightness-0 invert" /></Link>
          <div className="flex items-center gap-2">
            <WalletBadge />
            <NotificationPanel />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-1">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>

        {/* Mobile nav dropdown */}
        {mobileOpen && (
          <div className="lg:hidden bg-[hsl(220,35%,12%)] border-b border-white/10 px-4 py-3 space-y-1">
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
                      ? "bg-white/10 text-white font-medium"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
            <div className="px-3 py-2 border-t border-white/10 mt-2 pt-3 space-y-2">
              <CurrencySelector className="w-full h-8 text-xs bg-[hsl(220,35%,18%)] border-white/10 text-white/70" />
            </div>
            <Link
              to="/login"
              className="block px-3 py-2 text-xs text-white/50 hover:text-white"
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
