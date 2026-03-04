import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Lock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";

interface Milestone {
  id: string;
  title: string;
  description: string;
  amountUsd: number;
  status: "completed" | "active" | "locked";
  completedDate?: string;
  dueDate: string;
}

const milestones: Milestone[] = [
  { id: "M1", title: "Initial Deposit", description: "10% of raised capital released upon KYB approval", amountUsd: 4800, status: "completed", completedDate: "2025-11-15", dueDate: "2025-11-30" },
  { id: "M2", title: "Operational Proof", description: "30% released after submitting 3 months of verified revenue reports", amountUsd: 14400, status: "completed", completedDate: "2026-01-20", dueDate: "2026-02-28" },
  { id: "M3", title: "Growth Milestone", description: "30% released upon achieving 20% revenue growth target", amountUsd: 14400, status: "active", dueDate: "2026-05-31" },
  { id: "M4", title: "Final Release", description: "Remaining 30% released after 12-month compliance period", amountUsd: 14400, status: "locked", dueDate: "2026-11-15" },
];

const statusConfig = {
  completed: { icon: Check, color: "text-success", bg: "bg-success", label: "Completed" },
  active: { icon: Clock, color: "text-accent", bg: "bg-accent", label: "In Progress" },
  locked: { icon: Lock, color: "text-muted-foreground", bg: "bg-muted-foreground", label: "Locked" },
};

const EscrowTracker = () => {
  const { format } = useCurrency();
  const totalEscrow = milestones.reduce((s, m) => s + m.amountUsd, 0);
  const released = milestones.filter(m => m.status === "completed").reduce((s, m) => s + m.amountUsd, 0);
  const pct = Math.round((released / totalEscrow) * 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-display">Escrow & Fund Release</CardTitle>
          <Badge variant="secondary" className="text-xs">{pct}% Released</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm mt-2">
          <div>
            <span className="text-muted-foreground">Total Escrow:</span>{" "}
            <span className="font-semibold">{format(totalEscrow)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Released:</span>{" "}
            <span className="font-semibold text-success">{format(released)}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-2 rounded-full bg-muted mt-3 overflow-hidden">
          <div className="h-full rounded-full bg-success transition-all" style={{ width: `${pct}%` }} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          {milestones.map((m, i) => {
            const cfg = statusConfig[m.status];
            const Icon = cfg.icon;
            return (
              <div key={m.id} className="flex gap-4">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", m.status === "completed" ? "bg-success text-white" : m.status === "active" ? "bg-accent text-white" : "bg-muted text-muted-foreground")}>
                    <Icon size={14} />
                  </div>
                  {i < milestones.length - 1 && (
                    <div className={cn("w-0.5 flex-1 min-h-[40px]", m.status === "completed" ? "bg-success" : "bg-border")} />
                  )}
                </div>
                {/* Content */}
                <div className="pb-6 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">{m.title}</h4>
                    <span className="font-semibold text-sm">{format(m.amountUsd)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <Badge variant="secondary" className={cn("text-[10px]", cfg.color)}>{cfg.label}</Badge>
                    {m.completedDate && <span className="text-muted-foreground">Completed {m.completedDate}</span>}
                    {m.status !== "completed" && <span className="text-muted-foreground">Due {m.dueDate}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default EscrowTracker;
