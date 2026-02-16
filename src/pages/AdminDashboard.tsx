import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Shield, Users, FileText, CheckCircle, XCircle, Clock, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/admin", label: "Overview", icon: Shield },
  { to: "/admin/businesses", label: "Businesses", icon: FileText },
  { to: "/admin/users", label: "Users", icon: Users },
];

const pendingBusinesses = [
  { name: "Accra Fintech", sector: "Financial Services", submitted: "2026-02-14", status: "Pending" },
  { name: "Dar Coffee Co.", sector: "Agriculture", submitted: "2026-02-13", status: "Pending" },
];

const recentActivity = [
  { action: "Business approved", target: "Cape Solar", time: "2h ago" },
  { action: "User flagged", target: "user@test.com", time: "5h ago" },
  { action: "Token audit completed", target: "Nala Logistics", time: "1d ago" },
  { action: "Business rejected", target: "XYZ Ltd", time: "2d ago" },
];

const AdminDashboard = () => (
  <DashboardLayout title="Admin Dashboard" navItems={navItems}>
    <div className="mb-8">
      <h1 className="font-display text-2xl font-bold">Admin Overview</h1>
      <p className="text-muted-foreground text-sm mt-1">Platform management and compliance</p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        { label: "Total Users", value: "3,842", icon: Users },
        { label: "Active Businesses", value: "118", icon: FileText },
        { label: "Pending Approvals", value: "2", icon: Clock },
        { label: "Total Volume", value: "$4.2M", icon: BarChart3 },
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

    <div className="grid lg:grid-cols-2 gap-6">
      {/* Pending Approvals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pending Business Approvals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingBusinesses.map((b) => (
            <div key={b.name} className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div>
                <div className="font-medium">{b.name}</div>
                <div className="text-xs text-muted-foreground">{b.sector} · Submitted {b.submitted}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="gradient-gold text-primary-foreground text-xs">
                  <CheckCircle size={14} className="mr-1" /> Approve
                </Button>
                <Button size="sm" variant="outline" className="text-xs text-destructive border-destructive/30 hover:bg-destructive/5">
                  <XCircle size={14} className="mr-1" /> Reject
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div>
                <div className="text-sm font-medium">{a.action}</div>
                <div className="text-xs text-muted-foreground">{a.target}</div>
              </div>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default AdminDashboard;
