import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Building2, Coins, DollarSign, Users, Plus, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const navItems = [
  { to: "/business", label: "Overview", icon: Building2 },
  { to: "/business/tokens", label: "My Tokens", icon: Coins },
  { to: "/business/investors", label: "Investors", icon: Users },
];

const revenueData = [
  { month: "Sep", revenue: 85000, payouts: 12000 },
  { month: "Oct", revenue: 92000, payouts: 13800 },
  { month: "Nov", revenue: 88000, payouts: 13200 },
  { month: "Dec", revenue: 105000, payouts: 15750 },
  { month: "Jan", revenue: 115000, payouts: 17250 },
  { month: "Feb", revenue: 120000, payouts: 18000 },
];

const issuedTokens = [
  { name: "Revenue Token A", type: "Revenue", issued: 500, sold: 380, price: "$15" },
  { name: "Asset Token B", type: "Asset", issued: 300, sold: 220, price: "$20" },
];

const BusinessDashboard = () => (
  <DashboardLayout title="Business Dashboard" navItems={navItems}>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-2xl font-bold">Business Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your tokens and track revenue</p>
      </div>
      <Button className="gradient-navy text-primary-foreground font-semibold">
        <Plus size={16} className="mr-2" /> Issue New Token
      </Button>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        { label: "Monthly Revenue", value: "$120K", icon: DollarSign },
        { label: "Total Tokens Issued", value: "800", icon: Coins },
        { label: "Active Investors", value: "142", icon: Users },
        { label: "Total Capital Raised", value: "$48K", icon: BarChart3 },
      ].map((s) => (
        <Card key={s.label}>
          <CardContent className="p-5">
            <s.icon size={20} className="text-primary mb-3" />
            <div className="font-display text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Revenue Chart */}
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-base">Revenue & Payouts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <Tooltip />
              <Bar dataKey="revenue" fill="hsl(220 40% 25%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="payouts" fill="hsl(160 60% 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>

    {/* Issued Tokens */}
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Issued Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-3 font-medium">Token</th>
                <th className="text-left py-3 font-medium">Type</th>
                <th className="text-right py-3 font-medium">Issued</th>
                <th className="text-right py-3 font-medium">Sold</th>
                <th className="text-right py-3 font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {issuedTokens.map((t) => (
                <tr key={t.name} className="border-b border-border/50">
                  <td className="py-3 font-medium">{t.name}</td>
                  <td><Badge variant="secondary" className="text-xs">{t.type}</Badge></td>
                  <td className="text-right">{t.issued}</td>
                  <td className="text-right">{t.sold}</td>
                  <td className="text-right font-medium">{t.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </DashboardLayout>
);

export default BusinessDashboard;
