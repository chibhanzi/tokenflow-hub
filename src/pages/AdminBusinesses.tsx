import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Shield, Users, FileText, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/admin", label: "Overview", icon: Shield },
  { to: "/admin/businesses", label: "Businesses", icon: FileText },
  { to: "/admin/users", label: "Users", icon: Users },
];

const businesses = [
  { name: "Nala Logistics", sector: "Transport", status: "Approved", tokens: 500, date: "2025-10-15" },
  { name: "Mombasa Farms", sector: "Agriculture", status: "Approved", tokens: 300, date: "2025-11-20" },
  { name: "TechHub Lagos", sector: "Technology", status: "Approved", tokens: 1000, date: "2025-12-01" },
  { name: "Accra Fintech", sector: "Finance", status: "Pending", tokens: 600, date: "2026-02-14" },
  { name: "Dar Coffee Co.", sector: "Agriculture", status: "Pending", tokens: 200, date: "2026-02-13" },
  { name: "XYZ Ltd", sector: "Retail", status: "Rejected", tokens: 0, date: "2026-02-10" },
];

const AdminBusinesses = () => (
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
                <th className="text-right p-4 font-medium">Tokens</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map((b) => (
                <tr key={b.name} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium">{b.name}</div>
                    <div className="text-xs text-muted-foreground">{b.date}</div>
                  </td>
                  <td className="p-4 text-muted-foreground">{b.sector}</td>
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
                    {b.status === "Pending" && (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" className="text-xs text-accent"><CheckCircle size={14} /></Button>
                        <Button size="sm" variant="ghost" className="text-xs text-destructive"><XCircle size={14} /></Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </DashboardLayout>
);

export default AdminBusinesses;
