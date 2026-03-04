import { useState } from "react";
import { Bell, Check, Coins, TrendingUp, ShieldCheck, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: "trade" | "payout" | "approval" | "alert";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: "1", type: "payout", title: "Payout Received", message: "You received $120 from TechHub Lagos revenue share", time: "2 min ago", read: false },
  { id: "2", type: "trade", title: "Buy Order Filled", message: "50 Nala Logistics tokens purchased at $15.00/token", time: "1 hour ago", read: false },
  { id: "3", type: "alert", title: "Price Alert", message: "Accra Fintech token price up 8% this week", time: "3 hours ago", read: false },
  { id: "4", type: "approval", title: "KYB Approved", message: "Your business application has been approved", time: "1 day ago", read: true },
  { id: "5", type: "trade", title: "Sell Order Matched", message: "20 Zanzibar Tours tokens sold at $12.10/token", time: "2 days ago", read: true },
  { id: "6", type: "payout", title: "Payout Received", message: "You received $95 from Cape Solar asset returns", time: "3 days ago", read: true },
];

const typeIcons = {
  trade: Coins,
  payout: TrendingUp,
  approval: ShieldCheck,
  alert: Building2,
};

const typeColors = {
  trade: "text-accent",
  payout: "text-success",
  approval: "text-primary",
  alert: "text-warning",
};

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-[10px] font-bold text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto">
        <SheetHeader className="mb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-lg">Notifications</SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={markAllRead}>
                <Check size={12} className="mr-1" /> Mark all read
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="space-y-1">
          {notifications.map(n => {
            const Icon = typeIcons[n.type];
            return (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-colors flex gap-3",
                  n.read ? "hover:bg-muted/50" : "bg-accent/5 hover:bg-accent/10"
                )}
              >
                <div className={cn("mt-0.5 shrink-0", typeColors[n.type])}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{n.title}</span>
                    {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                  <span className="text-[10px] text-muted-foreground mt-1 block">{n.time}</span>
                </div>
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationPanel;
