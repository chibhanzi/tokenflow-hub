import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Shield, Users, FileText, CheckCircle, XCircle, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

const AdminBusinesses = () => {
  const { toast } = useToast();
  const [apps, setApps] = useState<BusinessApplication[]>(businessApplications);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedBiz, setSelectedBiz] = useState<BusinessApplication | null>(null);

  const handleApprove = (id: string) => {
    setApps(prev => prev.map(b => b.id === id ? { ...b, status: "Approved" as const } : b));
    const biz = apps.find(b => b.id === id);
    toast({ title: "Business approved", description: `${biz?.name} has been approved.` });
  };

  const handleReject = (id: string) => {
    setApps(prev => prev.map(b => b.id === id ? { ...b, status: "Rejected" as const } : b));
    const biz = apps.find(b => b.id === id);
    toast({ title: "Business rejected", description: `${biz?.name} has been rejected.`, variant: "destructive" });
  };

  const openReview = (biz: BusinessApplication) => {
    setSelectedBiz(biz);
    setReviewOpen(true);
  };

  return (
    <DashboardLayout title="Admin Dashboard" navItems={navItems}>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">Business Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Review and manage registered businesses</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-4 font-medium">Business</th>
                  <th className="text-left p-4 font-medium">Sector</th>
                  <th className="text-left p-4 font-medium">Location</th>
                  <th className="text-right p-4 font-medium">Revenue</th>
                  <th className="text-right p-4 font-medium">Tokens</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((b) => (
                  <tr key={b.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <button className="text-left hover:text-primary transition-colors" onClick={() => openReview(b)}>
                        <div className="font-medium">{b.name}</div>
                        <div className="text-xs text-muted-foreground">{b.submittedDate}</div>
                      </button>
                    </td>
                    <td className="p-4 text-muted-foreground">{b.sector}</td>
                    <td className="p-4 text-muted-foreground">{b.city}, {b.country}</td>
                    <td className="p-4 text-right font-medium">{b.annualRevenue}</td>
                    <td className="p-4 text-right">{b.tokens}</td>
                    <td className="p-4">
                      <Badge
                        variant={b.status === "Approved" ? "default" : b.status === "Pending" ? "secondary" : "destructive"}
                        className="text-xs"
                      >
                        {b.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => openReview(b)}>
                          <Eye size={14} />
                        </Button>
                        {b.status === "Pending" && (
                          <>
                            <Button size="sm" variant="ghost" className="text-xs h-7 text-accent" onClick={() => handleApprove(b.id)}>
                              <CheckCircle size={14} />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-xs h-7 text-destructive" onClick={() => handleReject(b.id)}>
                              <XCircle size={14} />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

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

export default AdminBusinesses;
