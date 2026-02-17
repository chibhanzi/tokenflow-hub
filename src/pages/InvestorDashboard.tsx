import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart3, Coins, History, Search, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const navItems = [
  { to: "/investor", label: "Portfolio", icon: BarChart3 },
  { to: "/investor/marketplace", label: "Marketplace", icon: Coins },
  { to: "/investor/transactions", label: "Transactions", icon: History },
];

const portfolioData = [
  { month: "Sep", value: 4200 }, { month: "Oct", value: 5100 },
  { month: "Nov", value: 4800 }, { month: "Dec", value: 6300 },
  { month: "Jan", value: 7200 }, { month: "Feb", value: 8500 },
];

const holdings = [
  { name: "Nala Logistics", type: "Revenue", tokens: 150, value: "$2,250", roi: "+12.4%", risk: "Low" },
  { name: "Mombasa Farms", type: "Asset", tokens: 80, value: "$1,600", roi: "+8.2%", risk: "Medium" },
  { name: "TechHub Lagos", type: "Equity", tokens: 200, value: "$4,000", roi: "+22.1%", risk: "High" },
];

const InvestorDashboard = () => {
  return (
    <DashboardLayout title="Investor Dashboard" navItems={navItems}>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">Portfolio Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your token investments and returns</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Value", value: "$7,850", icon: Wallet, change: "+18.3%" },
          { label: "Total ROI", value: "+14.2%", icon: TrendingUp, change: "+2.1%" },
          { label: "Tokens Held", value: "430", icon: Coins, change: "+50" },
          { label: "Payouts", value: "$1,240", icon: BarChart3, change: "This month" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <s.icon size={20} className="text-primary" />
                <span className="text-xs text-accent font-medium">{s.change}</span>
              </div>
              <div className="font-display text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Portfolio Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(200 70% 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(200 70% 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="hsl(200 70% 50%)" fill="url(#goldGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Holdings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Your Holdings</CardTitle>
          <div className="relative w-36 sm:w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8 h-8 text-xs" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-3 font-medium">Business</th>
                  <th className="text-left py-3 font-medium">Type</th>
                  <th className="text-right py-3 font-medium">Tokens</th>
                  <th className="text-right py-3 font-medium">Value</th>
                  <th className="text-right py-3 font-medium">ROI</th>
                  <th className="text-right py-3 font-medium">Risk</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => (
                  <tr key={h.name} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 font-medium">{h.name}</td>
                    <td><Badge variant="secondary" className="text-xs">{h.type}</Badge></td>
                    <td className="text-right">{h.tokens}</td>
                    <td className="text-right font-medium">{h.value}</td>
                    <td className="text-right text-accent font-medium">{h.roi}</td>
                    <td className="text-right">
                      <Badge variant={h.risk === "Low" ? "default" : h.risk === "Medium" ? "secondary" : "destructive"} className="text-xs">
                        {h.risk}
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
};

export default InvestorDashboard;
