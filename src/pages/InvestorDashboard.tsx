import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart3, Coins, History, Search, TrendingUp, Wallet, TrendingDown, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SellTokenModal from "@/components/marketplace/SellTokenModal";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

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
  { name: "Nala Logistics", type: "Revenue", tokens: 150, value: "$2,250", roi: "+12.4%", risk: "Low", color: "from-blue-500 to-blue-700" },
  { name: "Mombasa Farms", type: "Asset", tokens: 80, value: "$1,600", roi: "+8.2%", risk: "Medium", color: "from-green-500 to-green-700" },
  { name: "TechHub Lagos", type: "Equity", tokens: 200, value: "$4,000", roi: "+22.1%", risk: "High", color: "from-purple-500 to-purple-700" },
];

const riskColor = {
  Low: "bg-green-500/10 text-green-600 border-green-500/20",
  Medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  High: "bg-red-500/10 text-red-600 border-red-500/20",
};

const InvestorDashboard = () => {
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState<typeof holdings[0] | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSell = (h: typeof holdings[0]) => {
    setSelectedHolding(h);
    setSellModalOpen(true);
  };

  const filtered = holdings.filter(h => h.name.toLowerCase().includes(search.toLowerCase()));

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
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base">Your Holdings</CardTitle>
          <div className="relative w-36 sm:w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8 h-8 text-xs" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto px-6 pb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-3 font-medium">Business</th>
                  <th className="text-left py-3 font-medium">Type</th>
                  <th className="text-right py-3 font-medium">Tokens</th>
                  <th className="text-right py-3 font-medium">Value</th>
                  <th className="text-right py-3 font-medium">ROI</th>
                  <th className="text-right py-3 font-medium">Risk</th>
                  <th className="text-right py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((h) => (
                  <tr key={h.name} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 font-medium">{h.name}</td>
                    <td><Badge variant="secondary" className="text-xs">{h.type}</Badge></td>
                    <td className="text-right">{h.tokens}</td>
                    <td className="text-right font-medium">{h.value}</td>
                    <td className="text-right text-accent font-medium">{h.roi}</td>
                    <td className="text-right">
                      <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full border", riskColor[h.risk as keyof typeof riskColor])}>
                        {h.risk}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" className="text-xs h-7 gap-1" onClick={() => navigate("/investor/marketplace")}>
                          <ShoppingCart size={11} /> Buy More
                        </Button>
                        <Button size="sm" className="text-xs h-7 gap-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground" onClick={() => handleSell(h)}>
                          <TrendingDown size={11} /> Sell
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-border">
            {filtered.map((h) => (
              <div key={h.name} className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${h.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                    {h.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{h.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-xs">{h.type}</Badge>
                      <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full border", riskColor[h.risk as keyof typeof riskColor])}>
                        {h.risk} Risk
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-muted/50 rounded-lg p-2">
                    <div className="text-xs text-muted-foreground">Tokens</div>
                    <div className="font-semibold text-sm">{h.tokens}</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2">
                    <div className="text-xs text-muted-foreground">Value</div>
                    <div className="font-semibold text-sm">{h.value}</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2">
                    <div className="text-xs text-muted-foreground">ROI</div>
                    <div className="font-semibold text-sm text-accent">{h.roi}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="gap-1.5 font-semibold" onClick={() => navigate("/investor/marketplace")}>
                    <ShoppingCart size={14} /> Buy More
                  </Button>
                  <Button className="gap-1.5 font-semibold bg-destructive hover:bg-destructive/90 text-destructive-foreground" onClick={() => handleSell(h)}>
                    <TrendingDown size={14} /> Sell Tokens
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <SellTokenModal holding={selectedHolding} open={sellModalOpen} onOpenChange={setSellModalOpen} />
    </DashboardLayout>
  );
};

export default InvestorDashboard;
