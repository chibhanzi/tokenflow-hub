import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Coins, BarChart3, GitCompare } from "lucide-react";
import depeerLogo from "../assets/depeer-logo.png";

const FloatingBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/marketplace", icon: Coins, label: "Browse" },
    { path: "/dashboard/investor", icon: BarChart3, label: "Portfolio" },
    { path: "/compare", icon: GitCompare, label: "Compare" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Floating Bottom Nav - Fixed Position */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
        <div className="flex justify-between items-center px-3 py-2">
          {/* Logo Section */}
          <div className="flex items-center gap-2 px-2">
            <img
              src={depeerLogo}
              alt="DePeer"
              className="w-6 h-6 object-contain"
            />
            <span className="text-xs font-bold text-navy">DePeer</span>
          </div>

          {/* Navigation Items */}
          <div className="flex gap-1 flex-1 justify-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-xl transition-all min-w-[60px]",
                    isActive(item.path)
                      ? "text-accent bg-accent/10 shadow-sm"
                      : "text-gray-600 hover:text-navy hover:bg-gray-100/50 active:scale-95"
                  )}
                >
                  <Icon size={20} />
                  <span className="text-xs font-medium leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Spacer for balance */}
          <div className="w-12" />
        </div>
      </nav>

      {/* Padding to prevent content from overlapping */}
      <div className="h-20" />
    </>
  );
};

export default FloatingBottomNav;