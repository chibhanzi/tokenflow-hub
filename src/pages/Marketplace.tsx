import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Coins, Search, ShieldCheck, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { to: "/investor", label: "Portfolio", icon: TrendingUp },
  { to: "/investor/marketplace", label: "Marketplace", icon: Coins },
  { to: "/investor/transactions", label: "Transactions", icon: ShieldCheck },
];

const businesses = [
  { name: "Nala Logistics", sector: "Transport & Logistics", tokens: "Revenue", price: "$15/token", risk: 3, revenue: "$120K/mo", available: 500 },
  { name: "Mombasa Farms", sector: "Agriculture", tokens: "Asset", price: "$20/token", risk: 5, revenue: "$85K/mo", available: 300 },
  { name: "TechHub Lagos", sector: "Technology", tokens: "Equity", price: "$20/token", risk: 7, revenue: "$200K/mo", available: 1000 },
  { name: "Zanzibar Tours", sector: "Tourism", tokens: "Revenue", price: "$12/token", risk: 4, revenue: "$65K/mo", available: 400 },
  { name: "Cape Solar", sector: "Energy", tokens: "Asset", price: "$25/token", risk: 2, revenue: "$150K/mo", available: 800 },
  { name: "Accra Fintech", sector: "Financial Services", tokens: "Equity", price: "$30/token", risk: 6, revenue: "$300K/mo", available: 600 },
];

const Marketplace = () => (
  <DashboardLayout title="Investor Dashboard" navItems={navItems}>
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold">Token Marketplace</h1>
        <p className="text-muted-foreground text-sm mt-1">Browse and invest in tokenised African SMEs</p>
      </div>
      <div className="relative w-full sm:w-72">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search businesses..." className="pl-8" />
      </div>
    </div>

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {businesses.map((b) => (
        <Card key={b.name} className="hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base font-display">{b.name}</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">{b.sector}</p>
              </div>
              <Badge variant="secondary" className="text-xs">{b.tokens}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-muted-foreground text-xs">Price</div>
                <div className="font-semibold">{b.price}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Revenue</div>
                <div className="font-semibold">{b.revenue}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Risk Score</div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className={`w-1.5 h-3 rounded-full ${i < b.risk ? "bg-primary" : "bg-muted"}`} />
                  ))}
                  <span className="text-xs ml-1 text-muted-foreground">{b.risk}/10</span>
                </div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Available</div>
                <div className="font-semibold">{b.available} tokens</div>
              </div>
            </div>
            <Button className="w-full gradient-gold text-primary-foreground text-sm font-semibold">
              Buy Tokens
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </DashboardLayout>
);

export default Marketplace;
