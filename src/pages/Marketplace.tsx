import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Coins, Search, ShieldCheck, TrendingUp, MapPin, Calendar, Users, BarChart3, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BuyTokenModal from "@/components/marketplace/BuyTokenModal";

const navItems = [
  { to: "/investor", label: "Portfolio", icon: TrendingUp },
  { to: "/investor/marketplace", label: "Marketplace", icon: Coins },
  { to: "/investor/transactions", label: "Transactions", icon: ShieldCheck },
];

const businesses = [
  {
    name: "Nala Logistics",
    sector: "Transport & Logistics",
    tokens: "Revenue",
    price: "$15/token",
    risk: 3,
    revenue: "$120K/mo",
    available: 500,
    location: "Nairobi, Kenya",
    founded: "2019",
    employees: "45",
    growth: "+18%",
    initials: "NL",
    color: "from-[hsl(200,70%,45%)] to-[hsl(220,40%,25%)]",
  },
  {
    name: "Mombasa Farms",
    sector: "Agriculture",
    tokens: "Asset",
    price: "$20/token",
    risk: 5,
    revenue: "$85K/mo",
    available: 300,
    location: "Mombasa, Kenya",
    founded: "2017",
    employees: "120",
    growth: "+12%",
    initials: "MF",
    color: "from-[hsl(160,60%,40%)] to-[hsl(160,50%,30%)]",
  },
  {
    name: "TechHub Lagos",
    sector: "Technology",
    tokens: "Equity",
    price: "$20/token",
    risk: 7,
    revenue: "$200K/mo",
    available: 1000,
    location: "Lagos, Nigeria",
    founded: "2021",
    employees: "32",
    growth: "+45%",
    initials: "TL",
    color: "from-[hsl(260,50%,50%)] to-[hsl(280,40%,35%)]",
  },
  {
    name: "Zanzibar Tours",
    sector: "Tourism",
    tokens: "Revenue",
    price: "$12/token",
    risk: 4,
    revenue: "$65K/mo",
    available: 400,
    location: "Zanzibar, Tanzania",
    founded: "2018",
    employees: "28",
    growth: "+22%",
    initials: "ZT",
    color: "from-[hsl(38,80%,50%)] to-[hsl(25,70%,40%)]",
  },
  {
    name: "Cape Solar",
    sector: "Energy",
    tokens: "Asset",
    price: "$25/token",
    risk: 2,
    revenue: "$150K/mo",
    available: 800,
    location: "Cape Town, SA",
    founded: "2020",
    employees: "55",
    growth: "+30%",
    initials: "CS",
    color: "from-[hsl(45,90%,50%)] to-[hsl(30,80%,45%)]",
  },
  {
    name: "Accra Fintech",
    sector: "Financial Services",
    tokens: "Equity",
    price: "$30/token",
    risk: 6,
    revenue: "$300K/mo",
    available: 600,
    location: "Accra, Ghana",
    founded: "2022",
    employees: "18",
    growth: "+60%",
    initials: "AF",
    color: "from-[hsl(350,65%,50%)] to-[hsl(340,55%,40%)]",
  },
];

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

const Marketplace = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<typeof businesses[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBuy = (b: typeof businesses[0]) => {
    setSelected(b);
    setModalOpen(true);
  };

  return (
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
          <Card key={b.name} className="hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white font-display font-bold text-sm shrink-0`}>
                  {b.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-display">{b.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs shrink-0">{b.tokens}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{b.sector}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <MapPin size={10} />
                    <span>{b.location}</span>
                  </div>
                </div>
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
                  <div className="text-muted-foreground text-xs">Available</div>
                  <div className="font-semibold">{b.available} tokens</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">Growth</div>
                  <div className="font-semibold text-[hsl(var(--success))]">{b.growth}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-3">
                <span className="flex items-center gap-1"><Calendar size={10} /> Est. {b.founded}</span>
                <span className="flex items-center gap-1"><Users size={10} /> {b.employees} staff</span>
                <span className="flex items-center gap-1 ml-auto">
                  <BarChart3 size={10} /> Risk {b.risk}/10
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/investor/company/${toSlug(b.name)}`)}
                  className="flex-1 text-sm font-semibold"
                >
                  <Eye size={14} className="mr-1" /> View Details
                </Button>
                <Button
                  onClick={() => handleBuy(b)}
                  className="flex-1 bg-accent hover:bg-accent/90 text-white text-sm font-semibold"
                >
                  Buy Tokens
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <BuyTokenModal business={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </DashboardLayout>
  );
};

export default Marketplace;
