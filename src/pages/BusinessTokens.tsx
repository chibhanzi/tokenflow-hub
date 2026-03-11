import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Building2, Coins, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { to: "/business", label: "Overview", icon: Building2 },
  { to: "/business/tokens", label: "Issued Tokens", icon: Coins },
  { to: "/business/investors", label: "Investors", icon: Users },
];

const tokens = [
  { name: "Revenue Token A", type: "Revenue", issued: 500, sold: 380, price: "$15", status: "Active", backing: "Monthly revenue share" },
  { name: "Asset Token B", type: "Asset", issued: 300, sold: 220, price: "$20", status: "Active", backing: "Warehouse in Nairobi" },
  { name: "Equity Token C", type: "Equity", issued: 1000, sold: 0, price: "$25", status: "Pending", backing: "10% equity stake" },
];

const BusinessTokens = () => (
  <DashboardLayout title="Business Dashboard" navItems={navItems}>
    <div className="mb-8">
      <h1 className="font-display text-2xl font-bold">My Tokens</h1>
      <p className="text-muted-foreground text-sm mt-1">Manage your issued tokens</p>
    </div>

    <div className="grid gap-5">
      {tokens.map((t) => (
        <Card key={t.name}>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-display font-semibold">{t.name}</h3>
                  <Badge variant="secondary" className="text-xs">{t.type}</Badge>
                  <Badge variant={t.status === "Active" ? "default" : "secondary"} className="text-xs">{t.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Backing: {t.backing}</p>
              </div>
              <div className="flex gap-6 text-sm">
                <div><span className="text-muted-foreground">Issued:</span> <span className="font-semibold">{t.issued}</span></div>
                <div><span className="text-muted-foreground">Sold:</span> <span className="font-semibold">{t.sold}</span></div>
                <div><span className="text-muted-foreground">Price:</span> <span className="font-semibold">{t.price}</span></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </DashboardLayout>
);

export default BusinessTokens;
