import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart3, Coins, History, TrendingUp, DollarSign, Calendar, RefreshCw, GitCompare, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/contexts/CurrencyContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const navItems = [
  { to: "/investor", label: "Portfolio", icon: BarChart3 },
  { to: "/investor/marketplace", label: "Marketplace", icon: Coins },
  { to: "/investor/transactions", label: "Transactions", icon: History },
  { to: "/investor/compare", label: "Compare", icon: GitCompare },
  { to: "/investor/payouts", label: "Payouts", icon: CreditCard },
];

const payoutHistory = [
  { month: "Sep", amount: 85 }, { month: "Oct", amount: 110 },
  { month: "Nov", amount: 95 }, { month: "Dec", amount: 145 },
  { month: "Jan", amount: 180 }, { month: "Feb", amount: 215 },
];

const projectedYields = [
  { month: "Mar", projected: 230 }, { month: "Apr", projected: 245 },
  { month: "May", projected: 260 }, { month: "Jun", projected: 280 },
];

const payouts = [
  { id: "PAY-001", date: "2026-02-28", business: "TechHub Lagos", type: "Revenue Share", amount: 120, status: "Paid" },
  { id: "PAY-002", date: "2026-02-15", business: "Cape Solar", type: "Asset Return", amount: 95, status: "Paid" },
  { id: "PAY-003", date: "2026-01-31", business: "Nala Logistics", type: "Revenue Share", amount: 85, status: "Paid" },
  { id: "PAY-004", date: "2026-01-15", business: "Mombasa Farms", type: "Asset Return", amount: 64, status: "Paid" },
  { id: "PAY-005", date: "2026-03-15", business: "TechHub Lagos", type: "Revenue Share", amount: 135, status: "Scheduled" },
  { id: "PAY-006", date: "2026-03-31", business: "Cape Solar", type: "Asset Return", amount: 100, status: "Scheduled" },
];

const PayoutsDashboard = () => {
  const { format } = useCurrency();

  const totalEarned = payouts.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const upcoming = payouts.filter(p => p.status === "Scheduled").reduce((s, p) => s + p.amount, 0);
  const avgMonthly = Math.round(totalEarned / 6);

  return (
    <DashboardLayout title="Investor Dashboard" navItems={navItems}>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">Payouts & Dividends</h1>
        <p className="text-muted-foreground text-sm mt-1">Track earnings, yields, and reinvestment options</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Earned", value: format(totalEarned), icon: DollarSign, accent: true },
          { label: "Upcoming", value: format(upcoming), icon: Calendar },
          { label: "Avg Monthly", value: format(avgMonthly), icon: TrendingUp },
          { label: "Yield Rate", value: "8.4%", icon: BarChart3 },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <s.icon size={20} className="text-primary mb-3" />
              <div className={`font-display text-2xl font-bold ${s.accent ? "text-success" : ""}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Payout History Chart */}
        <Card>
          <CardHeader><CardTitle className="text-base">Payout History</CardTitle></CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={payoutHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
                  <Tooltip formatter={(v: number) => format(v)} />
                  <Bar dataKey="amount" fill="hsl(160 60% 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Projected Yields */}
        <Card>
          <CardHeader><CardTitle className="text-base">Projected Yields</CardTitle></CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[...payoutHistory.slice(-2).map(h => ({ month: h.month, projected: h.amount })), ...projectedYields]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
                  <Tooltip formatter={(v: number) => format(v)} />
                  <Line type="monotone" dataKey="projected" stroke="hsl(200 70% 50%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payout Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Payout History</CardTitle>
          <Button variant="outline" size="sm" className="text-xs gap-1.5">
            <RefreshCw size={12} /> Reinvest Earnings
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-4 font-medium">ID</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Business</th>
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-right p-4 font-medium">Amount</th>
                  <th className="text-right p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map(p => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-mono text-xs">{p.id}</td>
                    <td className="p-4 text-muted-foreground">{p.date}</td>
                    <td className="p-4 font-medium">{p.business}</td>
                    <td className="p-4"><Badge variant="secondary" className="text-xs">{p.type}</Badge></td>
                    <td className="p-4 text-right font-semibold text-success">{format(p.amount)}</td>
                    <td className="p-4 text-right">
                      <Badge variant={p.status === "Paid" ? "default" : "secondary"} className="text-xs">{p.status}</Badge>
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
};

export default PayoutsDashboard;
