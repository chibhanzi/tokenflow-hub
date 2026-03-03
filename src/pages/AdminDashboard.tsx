import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Shield, Users, FileText, CheckCircle, XCircle, Clock, BarChart3, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { businessApplications, BusinessApplication } from "@/data/businessApplications";
import BusinessReviewSheet from "@/components/admin/BusinessReviewSheet";

const navItems = [
  { to: "/admin", label: "Overview", icon: Shield },
  { to: "/admin/businesses", label: "Businesses", icon: FileText },
  { to: "/admin/users", label: "Users", icon: Users },
];

const recentActivity = [
  { action: "Business approved", target: "Cape Solar", time: "2h ago" },
  { action: "User flagged", target: "user@test.com", time: "5h ago" },
  { action: "Token audit completed", target: "Nala Logistics", time: "1d ago" },
  { action: "Business rejected", target: "XYZ Ltd", time: "2d ago" },
];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [apps, setApps] = useState<BusinessApplication[]>(businessApplications);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedBiz, setSelectedBiz] = useState<BusinessApplication | null>(null);

  const pending = apps.filter(b => b.status === "Pending");
  const approved = apps.filter(b => b.status === "Approved");

  const handleApprove = (id: string) => {
    setApps(prev => prev.map(b => b.id === id ? { ...b, status: "Approved" as const } : b));
    const biz = apps.find(b => b.id === id);
    toast({ title: "Business approved", description: `${biz?.name} has been approved and their tokens are now active.` });
  };

  const handleReject = (id: string) => {
    setApps(prev => prev.map(b => b.id === id ? { ...b, status: "Rejected" as const } : b));
    const biz = apps.find(b => b.id === id);
    toast({ title: "Business rejected", description: `${biz?.name} application has been rejected.`, variant: "destructive" });
  };

  const openReview = (biz: BusinessApplication) => {
    setSelectedBiz(biz);
    setReviewOpen(true);
  };

  return (
    <DashboardLayout title="Admin Dashboard" navItems={navItems}>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">Admin Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Platform management and compliance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Users", value: "3,842", icon: Users },
          { label: "Active Businesses", value: String(approved.length), icon: FileText },
          { label: "Pending Approvals", value: String(pending.length), icon: Clock },
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
            {pending.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No pending approvals</p>
            )}
            {pending.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="min-w-0 flex-1">
                  <button className="font-medium hover:text-primary transition-colors text-left" onClick={() => openReview(b)}>
                    {b.name}
                  </button>
                  <div className="text-xs text-muted-foreground">{b.sector} · Submitted {b.submittedDate}</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="ghost" className="text-xs" onClick={() => openReview(b)}>
                    <Eye size={14} className="mr-1" /> Review
                  </Button>
                  <Button size="sm" className="gradient-navy text-primary-foreground text-xs" onClick={() => handleApprove(b.id)}>
                    <CheckCircle size={14} className="mr-1" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs text-destructive border-destructive/30 hover:bg-destructive/5" onClick={() => handleReject(b.id)}>
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

      <BusinessReviewSheet
        business={selectedBiz}
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </DashboardLayout>
  );
};

export default AdminDashboard;
