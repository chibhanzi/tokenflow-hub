import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart3, Coins, History, GitCompare, CreditCard, User, Mail, Phone, MapPin, Shield, Bell, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

const navItems = [
  { to: "/investor", label: "Portfolio", icon: BarChart3 },
  { to: "/investor/marketplace", label: "Marketplace", icon: Coins },
  { to: "/investor/transactions", label: "Transactions", icon: History },
  { to: "/investor/compare", label: "Compare", icon: GitCompare },
  { to: "/investor/payouts", label: "Payouts", icon: CreditCard },
];

const InvestorProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "James",
    lastName: "Moyo",
    email: "james.moyo@email.com",
    phone: "+263 77 123 4567",
    location: "Harare, Zimbabwe",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    priceAlerts: true,
    payoutAlerts: true,
    marketingEmails: false,
  });

  const handleSave = () => {
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  return (
    <DashboardLayout title="Investor Dashboard" navItems={navItems}>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Profile & Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <User size={18} /> Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-accent text-white font-display text-xl">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Change Photo</Button>
              </div>
              <Separator />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input value={profile.firstName} onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input value={profile.lastName} onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label><Mail size={14} className="inline mr-1" />Email</Label>
                  <Input type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label><Phone size={14} className="inline mr-1" />Phone</Label>
                  <Input value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label><MapPin size={14} className="inline mr-1" />Location</Label>
                  <Input value={profile.location} onChange={e => setProfile(p => ({ ...p, location: e.target.value }))} />
                </div>
              </div>
              <Button onClick={handleSave} className="bg-accent hover:bg-accent/90 text-white">
                <Save size={14} className="mr-1" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Bell size={18} /> Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { key: "emailAlerts" as const, label: "Email Alerts", desc: "Get notified about account activity" },
                { key: "priceAlerts" as const, label: "Price Alerts", desc: "When token prices change significantly" },
                { key: "payoutAlerts" as const, label: "Payout Notifications", desc: "When you receive dividend payouts" },
                { key: "marketingEmails" as const, label: "Marketing Emails", desc: "Platform updates and new features" },
              ].map(n => (
                <div key={n.key} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{n.label}</div>
                    <div className="text-xs text-muted-foreground">{n.desc}</div>
                  </div>
                  <Switch checked={notifications[n.key]} onCheckedChange={v => setNotifications(p => ({ ...p, [n.key]: v }))} />
                </div>
              ))}
              <Button onClick={handleSave} className="bg-accent hover:bg-accent/90 text-white">
                <Save size={14} className="mr-1" /> Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Shield size={18} /> Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Two-Factor Authentication</div>
                  <div className="text-xs text-muted-foreground">Add an extra layer of security</div>
                </div>
                <Button variant="outline" size="sm">Enable 2FA</Button>
              </div>
              <Button onClick={handleSave} className="bg-accent hover:bg-accent/90 text-white">
                <Save size={14} className="mr-1" /> Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default InvestorProfile;
