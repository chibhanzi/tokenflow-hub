import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Building2, Coins, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { to: "/business", label: "Overview", icon: Building2 },
  { to: "/business/tokens", label: "My Tokens", icon: Coins },
  { to: "/business/investors", label: "Investors", icon: Users },
];

const investors = [
  { name: "John Mbeki", tokens: 50, type: "Revenue", invested: "$750", since: "2025-11-10" },
  { name: "Amina Hassan", tokens: 80, type: "Asset", invested: "$1,600", since: "2025-12-05" },
  { name: "David Okonkwo", tokens: 120, type: "Revenue", invested: "$1,800", since: "2026-01-15" },
  { name: "Sarah Ndungu", tokens: 40, type: "Equity", invested: "$1,000", since: "2026-02-01" },
];

const BusinessInvestors = () => (
  <DashboardLayout title="Business Dashboard" navItems={navItems}>
    <div className="mb-8">
      <h1 className="font-display text-2xl font-bold">Investors</h1>
      <p className="text-muted-foreground text-sm mt-1">People who have invested in your tokens</p>
    </div>

    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left p-4 font-medium">Investor</th>
                <th className="text-left p-4 font-medium">Token Type</th>
                <th className="text-right p-4 font-medium">Tokens</th>
                <th className="text-right p-4 font-medium">Invested</th>
                <th className="text-right p-4 font-medium">Since</th>
              </tr>
            </thead>
            <tbody>
              {investors.map((inv) => (
                <tr key={inv.name} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium">{inv.name}</td>
                  <td className="p-4"><Badge variant="secondary" className="text-xs">{inv.type}</Badge></td>
                  <td className="p-4 text-right">{inv.tokens}</td>
                  <td className="p-4 text-right font-medium">{inv.invested}</td>
                  <td className="p-4 text-right text-muted-foreground">{inv.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </DashboardLayout>
);

export default BusinessInvestors;
