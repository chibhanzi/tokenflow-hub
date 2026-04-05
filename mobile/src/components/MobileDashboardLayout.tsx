import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon, Menu, X, Home, Coins, BarChart3, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { useCurrency } from "@/contexts/CurrencyContext";

interface MobileDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  navItems: { to: string; label: string; icon: LucideIcon }[];
}

const MobileDashboardLayout = ({ children, title, navItems }: MobileDashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { balance } = useWallet();
  const { format } = useCurrency();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground p-2 hover:bg-accent rounded-lg"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="font-display text-lg font-bold text-navy">{title}</h1>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Balance</div>
          <div className="font-semibold text-navy">{format(balance)}</div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMobileOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border shadow-xl">
            <div className="p-6 border-b border-border">
              <h2 className="font-display font-bold text-navy">DePeer</h2>
              <p className="text-xs text-muted-foreground mt-1">Investor Dashboard</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors",
                      active
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-border space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate("/settings")}
              >
                <Settings size={18} className="mr-3" />
                Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={() => navigate("/login")}
              >
                <LogOut size={18} className="mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="border-t border-border bg-card px-2 py-2">
        <div className="flex justify-around">
          {navItems.slice(0, 4).map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg text-xs transition-colors",
                  active
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon size={20} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobileDashboardLayout;