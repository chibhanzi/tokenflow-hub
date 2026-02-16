import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Shield, Users, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { to: "/admin", label: "Overview", icon: Shield },
  { to: "/admin/businesses", label: "Businesses", icon: FileText },
  { to: "/admin/users", label: "Users", icon: Users },
];

const users = [
  { name: "John Mbeki", email: "john@example.com", role: "Investor", status: "Active", joined: "2025-09-10" },
  { name: "Amina Hassan", email: "amina@example.com", role: "Investor", status: "Active", joined: "2025-10-22" },
  { name: "Nala Logistics", email: "admin@nala.co", role: "Business", status: "Active", joined: "2025-10-15" },
  { name: "David Okonkwo", email: "david@example.com", role: "Investor", status: "Suspended", joined: "2025-11-05" },
  { name: "TechHub Lagos", email: "hello@techhub.ng", role: "Business", status: "Active", joined: "2025-12-01" },
];

const AdminUsers = () => (
  <DashboardLayout title="Admin Dashboard" navItems={navItems}>
    <div className="mb-8">
      <h1 className="font-display text-2xl font-bold">User Management</h1>
      <p className="text-muted-foreground text-sm mt-1">View and manage all platform users</p>
    </div>

    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left p-4 font-medium">User</th>
                <th className="text-left p-4 font-medium">Role</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium">{u.name}</div>
                    <div className="text-xs text-muted-foreground">{u.email}</div>
                  </td>
                  <td className="p-4"><Badge variant="secondary" className="text-xs">{u.role}</Badge></td>
                  <td className="p-4">
                    <Badge variant={u.status === "Active" ? "default" : "destructive"} className="text-xs">{u.status}</Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </DashboardLayout>
);

export default AdminUsers;
