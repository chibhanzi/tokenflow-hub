import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart3, Coins, History, Search, TrendingUp, Wallet, TrendingDown, ShoppingCart, ChevronRight, MapPin, Globe, ExternalLink, Calendar, Users, DollarSign, GitCompare, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SellTokenModal from "@/components/marketplace/SellTokenModal";
import BuyTokenModal from "@/components/marketplace/BuyTokenModal";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { businesses, toSlug } from "@/data/businesses";

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
  { name: "Nala Logistics", type: "Revenue", tokens: 150, value: "$2,250", roi: "+12.4%", risk: "Low", color: "from-blue-500 to-blue-700", purchasePrice: "$13.50/token", purchaseDate: "Oct 2024", earnedPayouts: "$180" },
  { name: "Mombasa Farms", type: "Asset", tokens: 80, value: "$1,600", roi: "+8.2%", risk: "Medium", color: "from-green-500 to-green-700", purchasePrice: "$18.50/token", purchaseDate: "Dec 2024", earnedPayouts: "$64" },
  { name: "TechHub Lagos", type: "Equity", tokens: 200, value: "$4,000", roi: "+22.1%", risk: "High", color: "from-purple-500 to-purple-700", purchasePrice: "$16.40/token", purchaseDate: "Nov 2024", earnedPayouts: "$490" },
];

const riskColor = {
  Low: "bg-green-500/10 text-green-600 border-green-500/20",
  Medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  High: "bg-red-500/10 text-red-600 border-red-500/20",
};

const InvestorDashboard = () => {
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState<typeof holdings[0] | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const findBusiness = (name: string) => businesses.find(b => b.name === name) ?? null;

  const handleSell = (h: typeof holdings[0]) => {
    setSelectedHolding(h);
    setSellModalOpen(true);
  };

  const handleBuyMore = (h: typeof holdings[0]) => {
    setSelectedHolding(h);
    setBuyModalOpen(true);
  };

  const handleViewDetail = (h: typeof holdings[0]) => {
    setSelectedHolding(h);
    setDetailSheetOpen(true);
  };

  const filtered = holdings.filter(h => h.name.toLowerCase().includes(search.toLowerCase()));
  const selectedBusiness = selectedHolding ? findBusiness(selectedHolding.name) : null;

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
                    <td className="py-3">
                      <button className="font-medium hover:text-primary transition-colors text-left flex items-center gap-1" onClick={() => handleViewDetail(h)}>
                        {h.name} <ChevronRight size={12} className="text-muted-foreground" />
                      </button>
                    </td>
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
                        <Button variant="outline" size="sm" className="text-xs h-7 gap-1" onClick={() => handleBuyMore(h)}>
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
                <button className="flex items-center gap-3 w-full text-left" onClick={() => handleViewDetail(h)}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${h.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                    {h.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate flex items-center gap-1">
                      {h.name} <ChevronRight size={13} className="text-muted-foreground shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-xs">{h.type}</Badge>
                      <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full border", riskColor[h.risk as keyof typeof riskColor])}>
                        {h.risk} Risk
                      </span>
                    </div>
                  </div>
                </button>
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
                  <Button variant="outline" className="gap-1.5 font-semibold" onClick={() => handleBuyMore(h)}>
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

      {/* Holding Detail Sheet */}
      <Sheet open={detailSheetOpen} onOpenChange={setDetailSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-[480px] overflow-y-auto">
          {selectedHolding && selectedBusiness && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedHolding.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {selectedHolding.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <SheetTitle className="font-display text-lg">{selectedHolding.name}</SheetTitle>
                    <p className="text-sm text-muted-foreground">{selectedBusiness.sector}</p>
                  </div>
                </div>
              </SheetHeader>

              {/* Your position */}
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Your Position</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Tokens Owned", value: `${selectedHolding.tokens}` },
                      { label: "Current Value", value: selectedHolding.value },
                      { label: "Total ROI", value: selectedHolding.roi, highlight: true },
                      { label: "Payouts Earned", value: selectedHolding.earnedPayouts },
                      { label: "Purchase Price", value: selectedHolding.purchasePrice },
                      { label: "Purchased", value: selectedHolding.purchaseDate },
                    ].map(item => (
                      <div key={item.label} className="rounded-lg bg-muted/50 p-3">
                        <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                        <div className={cn("font-semibold text-sm", item.highlight && "text-accent")}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Token type */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Token Details</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { label: "Token Type", value: <Badge>{selectedHolding.type}</Badge> },
                      { label: "Market Price", value: <span className="font-semibold">{selectedBusiness.price}</span> },
                      { label: "Risk Score", value: <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full border", riskColor[selectedHolding.risk as keyof typeof riskColor])}>{selectedHolding.risk} ({selectedBusiness.risk}/10)</span> },
                      { label: "Available to buy", value: <span className="font-semibold">{selectedBusiness.available} tokens</span> },
                    ].map(row => (
                      <div key={row.label} className="flex items-center justify-between">
                        <span className="text-muted-foreground">{row.label}</span>
                        {row.value}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Company snapshot */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Company Snapshot</h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { icon: MapPin, label: selectedBusiness.location },
                      { icon: Calendar, label: `Founded ${selectedBusiness.founded}` },
                      { icon: Users, label: `${selectedBusiness.employees} employees` },
                      { icon: BarChart3, label: `${selectedBusiness.revenue} revenue · ${selectedBusiness.growth} growth` },
                    ].map(row => (
                      <div key={row.label} className="flex items-center gap-2 text-muted-foreground">
                        <row.icon size={13} className="shrink-0" />
                        <span>{row.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="space-y-2 pb-6">
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="gap-1.5 font-semibold" onClick={() => { setDetailSheetOpen(false); handleBuyMore(selectedHolding); }}>
                      <ShoppingCart size={14} /> Buy More
                    </Button>
                    <Button className="gap-1.5 font-semibold bg-destructive hover:bg-destructive/90 text-destructive-foreground" onClick={() => { setDetailSheetOpen(false); handleSell(selectedHolding); }}>
                      <TrendingDown size={14} /> Sell Tokens
                    </Button>
                  </div>
                  <Button variant="ghost" className="w-full gap-1.5 text-muted-foreground" onClick={() => { setDetailSheetOpen(false); navigate(`/investor/company/${toSlug(selectedHolding.name)}`); }}>
                    <Globe size={14} /> View Full Company Profile <ExternalLink size={12} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <SellTokenModal holding={selectedHolding} open={sellModalOpen} onOpenChange={setSellModalOpen} />
      <BuyTokenModal business={selectedBusiness} open={buyModalOpen} onOpenChange={setBuyModalOpen} />
    </DashboardLayout>
  );
};

export default InvestorDashboard;
