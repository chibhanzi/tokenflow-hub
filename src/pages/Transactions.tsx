import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Coins, History, ShieldCheck, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { to: "/investor", label: "Portfolio", icon: TrendingUp },
  { to: "/investor/marketplace", label: "Marketplace", icon: Coins },
  { to: "/investor/transactions", label: "Transactions", icon: History },
];

const transactions = [
  { id: "TXN-001", date: "2026-02-15", type: "Purchase", business: "Nala Logistics", tokens: 50, amount: "$750", status: "Completed" },
  { id: "TXN-002", date: "2026-02-14", type: "Payout", business: "TechHub Lagos", tokens: 0, amount: "$120", status: "Completed" },
  { id: "TXN-003", date: "2026-02-12", type: "Purchase", business: "Mombasa Farms", tokens: 30, amount: "$600", status: "Pending" },
  { id: "TXN-004", date: "2026-02-10", type: "Sale", business: "Zanzibar Tours", tokens: 20, amount: "$280", status: "Completed" },
  { id: "TXN-005", date: "2026-02-08", type: "Payout", business: "Cape Solar", tokens: 0, amount: "$95", status: "Completed" },
];

const Transactions = () => (
  <DashboardLayout title="Investor Dashboard" navItems={navItems}>
    <div className="mb-8">
      <h1 className="font-display text-2xl font-bold">Transaction History</h1>
      <p className="text-muted-foreground text-sm mt-1">All your token purchases, sales, and payouts</p>
    </div>

    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left p-4 font-medium">ID</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Type</th>
                <th className="text-left p-4 font-medium">Business</th>
                <th className="text-right p-4 font-medium">Tokens</th>
                <th className="text-right p-4 font-medium">Amount</th>
                <th className="text-right p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-mono text-xs">{t.id}</td>
                  <td className="p-4 text-muted-foreground">{t.date}</td>
                  <td className="p-4">
                    <Badge variant={t.type === "Payout" ? "default" : "secondary"} className="text-xs">{t.type}</Badge>
                  </td>
                  <td className="p-4 font-medium">{t.business}</td>
                  <td className="p-4 text-right">{t.tokens || "—"}</td>
                  <td className="p-4 text-right font-medium">{t.amount}</td>
                  <td className="p-4 text-right">
                    <Badge variant={t.status === "Completed" ? "default" : "secondary"} className="text-xs">
                      {t.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </DashboardLayout>
);

export default Transactions;
