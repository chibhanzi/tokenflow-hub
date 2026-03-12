import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Coins, ShieldCheck, TrendingUp, MapPin, Calendar, Users, BarChart3, Globe, ArrowLeft, Building2, DollarSign, Briefcase, ExternalLink, GitCompare, CreditCard, History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import BuyTokenModal from "@/components/marketplace/BuyTokenModal";
import PriceChart from "@/components/marketplace/PriceChart";
import OrderBook from "@/components/marketplace/OrderBook";
import RegulatoryBadge from "@/components/compliance/RegulatoryBadge";
import { useCurrency } from "@/contexts/CurrencyContext";

const navItems = [
  { to: "/investor", label: "Portfolio", icon: BarChart3 },
  { to: "/investor/marketplace", label: "Marketplace", icon: Coins },
  { to: "/investor/transactions", label: "Transactions", icon: History },
  { to: "/investor/compare", label: "Compare", icon: GitCompare },
  { to: "/investor/payouts", label: "Payouts", icon: CreditCard },
];

const businessesData: Record<string, {
  name: string; sector: string; tokens: string; price: string; risk: number;
  revenue: string; available: number; location: string; founded: string;
  employees: string; growth: string; initials: string;
  color: string; website: string; description: string;
  ceo: string; totalRaised: string; tokensSold: number; totalTokens: number;
  highlights: string[]; revenueHistory: { period: string; amount: string }[];
}> = {
  "nala-logistics": {
    name: "Nala Logistics", sector: "Transport & Logistics", tokens: "Revenue",
    price: "$15/token", risk: 3, revenue: "$120K/mo", available: 500,
    location: "Nairobi, Kenya", founded: "2019", employees: "45", growth: "+18%",
    initials: "NL", color: "from-[hsl(200,70%,45%)] to-[hsl(220,40%,25%)]",
    website: "https://nalalogistics.co.ke",
    description: "Nala Logistics is a last-mile delivery and freight company operating across East Africa. They specialise in cold-chain logistics for agriculture and pharmaceutical products, serving over 200 businesses across Kenya, Uganda, and Tanzania.",
    ceo: "Amina Odhiambo", totalRaised: "$1.2M", tokensSold: 1500, totalTokens: 2000,
    highlights: ["Fleet of 120+ vehicles across 3 countries", "Partnered with Kenya's Ministry of Agriculture", "30% revenue growth year-over-year since 2021", "ISO 9001:2015 certified operations"],
    revenueHistory: [{ period: "Q1 2025", amount: "$340K" }, { period: "Q2 2025", amount: "$365K" }, { period: "Q3 2025", amount: "$390K" }, { period: "Q4 2025", amount: "$420K" }],
  },
  "mombasa-farms": {
    name: "Mombasa Farms", sector: "Agriculture", tokens: "Asset",
    price: "$20/token", risk: 5, revenue: "$85K/mo", available: 300,
    location: "Mombasa, Kenya", founded: "2017", employees: "120", growth: "+12%",
    initials: "MF", color: "from-[hsl(160,60%,40%)] to-[hsl(160,50%,30%)]",
    website: "https://mombasafarms.com",
    description: "Mombasa Farms operates large-scale sustainable agriculture across coastal Kenya. Their specialties include tropical fruit exports, organic vegetables, and aquaculture.",
    ceo: "David Mwangi", totalRaised: "$800K", tokensSold: 700, totalTokens: 1000,
    highlights: ["500+ hectares of certified organic farmland", "Export contracts with 12 international buyers", "Pioneering drip irrigation technology", "Employs 120+ full-time workers"],
    revenueHistory: [{ period: "Q1 2025", amount: "$240K" }, { period: "Q2 2025", amount: "$255K" }, { period: "Q3 2025", amount: "$260K" }, { period: "Q4 2025", amount: "$280K" }],
  },
  "techhub-lagos": {
    name: "TechHub Lagos", sector: "Technology", tokens: "Equity",
    price: "$20/token", risk: 7, revenue: "$200K/mo", available: 1000,
    location: "Lagos, Nigeria", founded: "2021", employees: "32", growth: "+45%",
    initials: "TL", color: "from-[hsl(260,50%,50%)] to-[hsl(280,40%,35%)]",
    website: "https://techhublagos.ng",
    description: "TechHub Lagos is a fast-growing SaaS company building fintech infrastructure for African businesses. Their API suite enables payments, lending, and KYC across 8 West African countries.",
    ceo: "Chidi Okonkwo", totalRaised: "$2.5M", tokensSold: 3000, totalTokens: 4000,
    highlights: ["Processing $50M+ monthly transactions", "API integrations with 15 major banks", "Y Combinator alumni (W2022 batch)", "45% quarter-over-quarter growth rate"],
    revenueHistory: [{ period: "Q1 2025", amount: "$480K" }, { period: "Q2 2025", amount: "$560K" }, { period: "Q3 2025", amount: "$680K" }, { period: "Q4 2025", amount: "$800K" }],
  },
  "zanzibar-tours": {
    name: "Zanzibar Tours", sector: "Tourism", tokens: "Revenue",
    price: "$12/token", risk: 4, revenue: "$65K/mo", available: 400,
    location: "Zanzibar, Tanzania", founded: "2018", employees: "28", growth: "+22%",
    initials: "ZT", color: "from-[hsl(38,80%,50%)] to-[hsl(25,70%,40%)]",
    website: "https://zanzibartours.co.tz",
    description: "Zanzibar Tours is a premium eco-tourism operator offering curated experiences across Zanzibar and mainland Tanzania.",
    ceo: "Fatima Hassan", totalRaised: "$600K", tokensSold: 600, totalTokens: 1000,
    highlights: ["TripAdvisor Travelers' Choice 2024 & 2025", "3 boutique eco-lodges with 95% occupancy rate", "Carbon-neutral certified operations", "Partnership with Tanzania National Parks Authority"],
    revenueHistory: [{ period: "Q1 2025", amount: "$160K" }, { period: "Q2 2025", amount: "$195K" }, { period: "Q3 2025", amount: "$210K" }, { period: "Q4 2025", amount: "$230K" }],
  },
  "cape-solar": {
    name: "Cape Solar", sector: "Energy", tokens: "Asset",
    price: "$25/token", risk: 2, revenue: "$150K/mo", available: 800,
    location: "Cape Town, SA", founded: "2020", employees: "55", growth: "+30%",
    initials: "CS", color: "from-[hsl(45,90%,50%)] to-[hsl(30,80%,45%)]",
    website: "https://capesolar.co.za",
    description: "Cape Solar designs and installs commercial solar energy systems across Southern Africa. They manage a portfolio of 40MW installed capacity.",
    ceo: "Pieter van der Merwe", totalRaised: "$3.1M", tokensSold: 2200, totalTokens: 3000,
    highlights: ["40MW+ installed solar capacity", "Serving 150+ commercial clients", "Backed by Development Finance Corporation", "Lowest risk rating on the DePeer platform"],
    revenueHistory: [{ period: "Q1 2025", amount: "$410K" }, { period: "Q2 2025", amount: "$440K" }, { period: "Q3 2025", amount: "$470K" }, { period: "Q4 2025", amount: "$500K" }],
  },
  "accra-fintech": {
    name: "Accra Fintech", sector: "Financial Services", tokens: "Equity",
    price: "$30/token", risk: 6, revenue: "$300K/mo", available: 600,
    location: "Accra, Ghana", founded: "2022", employees: "18", growth: "+60%",
    initials: "AF", color: "from-[hsl(350,65%,50%)] to-[hsl(340,55%,40%)]",
    website: "https://accrafintech.com",
    description: "Accra Fintech provides mobile money and micro-lending services across Ghana and Côte d'Ivoire. 500,000+ users and $12M in micro-loans with 96% repayment rate.",
    ceo: "Kwame Asante", totalRaised: "$1.8M", tokensSold: 1400, totalTokens: 2000,
    highlights: ["500,000+ registered users across 2 countries", "96% loan repayment rate", "Licensed by Bank of Ghana", "Fastest growing fintech in West Africa (TechCabal 2025)"],
    revenueHistory: [{ period: "Q1 2025", amount: "$680K" }, { period: "Q2 2025", amount: "$800K" }, { period: "Q3 2025", amount: "$950K" }, { period: "Q4 2025", amount: "$1.1M" }],
  },
};

const CompanyProfile = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { format } = useCurrency();
  const company = slug ? businessesData[slug] : null;

  if (!company) {
    return (
      <DashboardLayout title="Investor Dashboard" navItems={navItems}>
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-2">Company not found</h2>
          <Button variant="outline" onClick={() => navigate("/investor/marketplace")}>Back to Marketplace</Button>
        </div>
      </DashboardLayout>
    );
  }

  const tokenProgress = Math.round((company.tokensSold / company.totalTokens) * 100);
  const priceNum = parseFloat(company.price.replace(/[^0-9.]/g, ""));

  return (
    <DashboardLayout title="Investor Dashboard" navItems={navItems}>
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/investor/marketplace")} className="text-muted-foreground hover:text-foreground -ml-2">
          <ArrowLeft size={16} className="mr-1" /> Back to Marketplace
        </Button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white font-display font-bold text-xl shrink-0`}>
          {company.initials}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h1 className="font-display text-2xl font-bold">{company.name}</h1>
            <Badge variant="secondary">{company.tokens} Token</Badge>
          </div>
          <p className="text-muted-foreground text-sm mb-2">{company.sector}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin size={14} /> {company.location}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> Founded {company.founded}</span>
            <span className="flex items-center gap-1"><Users size={14} /> {company.employees} employees</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <Button variant="outline" size="sm" asChild>
            <a href={company.website} target="_blank" rel="noopener noreferrer">
              <Globe size={14} className="mr-1" /> Website <ExternalLink size={12} className="ml-1" />
            </a>
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate("/investor/compare")}>
            <GitCompare size={14} className="mr-1" /> Compare
          </Button>
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-white" onClick={() => setModalOpen(true)}>Buy Tokens</Button>
        </div>
      </div>

      {/* About */}
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-lg font-display">About</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{company.description}</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Briefcase size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">CEO:</span>
            <span className="font-medium">{company.ceo}</span>
          </div>
        </CardContent>
      </Card>

      {/* Price Chart + Order Book */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <PriceChart businessName={company.name} />
        <OrderBook businessName={company.name} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Key Metrics */}
        <Card>
          <CardHeader><CardTitle className="text-lg font-display">Key Metrics</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">Monthly Revenue</div>
                <div className="font-display font-bold text-lg">{company.revenue}</div>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">Growth</div>
                <div className="font-display font-bold text-lg text-success">{company.growth}</div>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">Total Raised</div>
                <div className="font-display font-bold text-lg">{company.totalRaised}</div>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">Risk Score</div>
                <div className="font-display font-bold text-lg flex items-center gap-1">
                  <BarChart3 size={16} /> {company.risk}/10
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Info */}
        <Card>
          <CardHeader><CardTitle className="text-lg font-display">Token Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Token Type</span>
              <Badge>{company.tokens}</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price per Token</span>
              <span className="font-semibold">{format(priceNum)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Available</span>
              <span className="font-semibold">{company.available} tokens</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fractional</span>
              <Badge variant="secondary" className="text-xs">Min 0.1 tokens</Badge>
            </div>
            <Separator />
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Tokens Sold</span>
                <span>{company.tokensSold} / {company.totalTokens}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-accent" style={{ width: `${tokenProgress}%` }} />
              </div>
            </div>
            <Button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold" onClick={() => setModalOpen(true)}>
              <DollarSign size={16} className="mr-1" /> Buy Tokens
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Regulatory + Highlights */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <RegulatoryBadge location={company.location} />
        <Card>
          <CardHeader><CardTitle className="text-lg font-display">Highlights</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {company.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" /> {h}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Revenue History */}
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-lg font-display">Revenue History</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {company.revenueHistory.map((r) => (
              <div key={r.period} className="rounded-lg bg-muted/50 p-3 text-center">
                <div className="text-xs text-muted-foreground">{r.period}</div>
                <div className="font-semibold mt-1">{r.amount}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <BuyTokenModal business={company} open={modalOpen} onOpenChange={setModalOpen} />
    </DashboardLayout>
  );
};

export default CompanyProfile;
