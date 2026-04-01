import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart3, Coins, History, Scale, DollarSign, TrendingUp, ShieldCheck, Users, MapPin, GitCompare, CreditCard, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { businesses } from "@/data/businesses";
import { useCurrency } from "@/contexts/CurrencyContext";
import { cn } from "@/lib/utils";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const navItems = [
  { to: "/investor", label: "Portfolio", icon: BarChart3 },
  { to: "/investor/marketplace", label: "Marketplace", icon: Coins },
  { to: "/investor/transactions", label: "Transactions", icon: History },
  { to: "/investor/compare", label: "Compare", icon: GitCompare },
  { to: "/investor/payouts", label: "Payouts", icon: CreditCard },
];

const getRadarData = (a: typeof businesses[0], b: typeof businesses[0]) => {
  const parseRev = (r: string) => parseFloat(r.replace(/[^0-9.]/g, ""));
  const parseGrowth = (g: string) => parseFloat(g.replace(/[^0-9.]/g, ""));
  return [
    { metric: "Revenue", A: parseRev(a.revenue), B: parseRev(b.revenue), fullMark: 300 },
    { metric: "Growth", A: parseGrowth(a.growth), B: parseGrowth(b.growth), fullMark: 60 },
    { metric: "Stability", A: 10 - a.risk, B: 10 - b.risk, fullMark: 10 },
    { metric: "Team Size", A: parseInt(a.employees), B: parseInt(b.employees), fullMark: 120 },
    { metric: "Supply", A: a.available / 10, B: b.available / 10, fullMark: 100 },
  ];
};

const CompareBusinesses = () => {
  const navigate = useNavigate();
  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(2);
  const { format } = useCurrency();

  const left = businesses[leftIdx];
  const right = businesses[rightIdx];
  const radarData = getRadarData(left, right);

  const parsePrice = (p: string) => parseFloat(p.replace(/[^0-9.]/g, ""));

  const metrics = [
    { label: "Token Type", left: left.tokens, right: right.tokens },
    { label: "Price/Token", left: format(parsePrice(left.price)), right: format(parsePrice(right.price)) },
    { label: "Revenue", left: left.revenue, right: right.revenue },
    { label: "Growth", left: left.growth, right: right.growth, highlight: true },
    { label: "Risk Score", left: `${left.risk}/10`, right: `${right.risk}/10`, lowerBetter: true },
    { label: "Available", left: `${left.available} tokens`, right: `${right.available} tokens` },
    { label: "Employees", left: left.employees, right: right.employees },
    { label: "Founded", left: left.founded, right: right.founded },
    { label: "Location", left: left.location, right: right.location },
  ];

  return (
    <DashboardLayout title="Investor Dashboard" navItems={navItems}>
      <div className="mb-8">
        <Button variant="ghost" size="sm" className="mb-2 -ml-2 gap-1 text-muted-foreground" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </Button>
        <h1 className="font-display text-2xl font-bold">Compare Businesses</h1>
        <p className="text-muted-foreground text-sm mt-1">Side-by-side analysis for informed investment decisions</p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <Select value={String(leftIdx)} onValueChange={v => setLeftIdx(Number(v))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {businesses.map((b, i) => (
                  <SelectItem key={b.name} value={String(i)} disabled={i === rightIdx}>{b.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-3 mt-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${left.color} flex items-center justify-center text-white font-bold text-xs`}>
                {left.initials}
              </div>
              <div>
                <div className="font-semibold text-sm">{left.name}</div>
                <div className="text-xs text-muted-foreground">{left.sector}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <Select value={String(rightIdx)} onValueChange={v => setRightIdx(Number(v))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {businesses.map((b, i) => (
                  <SelectItem key={b.name} value={String(i)} disabled={i === leftIdx}>{b.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-3 mt-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${right.color} flex items-center justify-center text-white font-bold text-xs`}>
                {right.initials}
              </div>
              <div>
                <div className="font-semibold text-sm">{right.name}</div>
                <div className="text-xs text-muted-foreground">{right.sector}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Radar Chart */}
      <Card className="mb-8">
        <CardHeader><CardTitle className="text-base">Performance Radar</CardTitle></CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(220 13% 88%)" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis tick={{ fontSize: 10 }} />
                <Radar name={left.name} dataKey="A" stroke="hsl(200 70% 50%)" fill="hsl(200 70% 50%)" fillOpacity={0.2} strokeWidth={2} />
                <Radar name={right.name} dataKey="B" stroke="hsl(350 65% 55%)" fill="hsl(350 65% 55%)" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-accent rounded" />{left.name}</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-destructive rounded" />{right.name}</span>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Table */}
      <Card>
        <CardHeader><CardTitle className="text-base">Detailed Comparison</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-4 font-medium">Metric</th>
                  <th className="text-center p-4 font-medium">{left.name}</th>
                  <th className="text-center p-4 font-medium">{right.name}</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map(m => (
                  <tr key={m.label} className="border-b border-border/50">
                    <td className="p-4 text-muted-foreground">{m.label}</td>
                    <td className={cn("p-4 text-center font-medium", m.highlight && "text-success")}>{m.left}</td>
                    <td className={cn("p-4 text-center font-medium", m.highlight && "text-success")}>{m.right}</td>
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

export default CompareBusinesses;
