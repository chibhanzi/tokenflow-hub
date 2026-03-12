import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Building2, Coins, Users, User, Mail, Phone, MapPin, Shield, Bell, Save, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

const navItems = [
  { to: "/business", label: "Overview", icon: Building2 },
  { to: "/business/tokens", label: "Issued Tokens", icon: Coins },
  { to: "/business/investors", label: "Investors", icon: Users },
];

const BusinessProfile = () => {
  const [profile, setProfile] = useState({
    businessName: "Nala Logistics",
    contactName: "Amina Odhiambo",
    email: "admin@nalalogistics.co.ke",
    phone: "+254 700 123 456",
    location: "Nairobi, Kenya",
    website: "https://nalalogistics.co.ke",
    description: "Last-mile delivery and freight company operating across East Africa.",
  });

  const [notifications, setNotifications] = useState({
    investorActivity: true,
    payoutReminders: true,
    complianceAlerts: true,
    marketingEmails: false,
  });

  const handleSave = () => {
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  return (
    <DashboardLayout title="Business Dashboard" navItems={navItems}>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Business Profile & Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your business account</p>
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
                <Building2 size={18} /> Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-accent text-white font-display text-xl">NL</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Change Logo</Button>
              </div>
              <Separator />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input value={profile.businessName} onChange={e => setProfile(p => ({ ...p, businessName: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label><User size={14} className="inline mr-1" />Contact Person</Label>
                  <Input value={profile.contactName} onChange={e => setProfile(p => ({ ...p, contactName: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label><Mail size={14} className="inline mr-1" />Email</Label>
                  <Input type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label><Phone size={14} className="inline mr-1" />Phone</Label>
                  <Input value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label><MapPin size={14} className="inline mr-1" />Location</Label>
                  <Input value={profile.location} onChange={e => setProfile(p => ({ ...p, location: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label><Globe size={14} className="inline mr-1" />Website</Label>
                  <Input value={profile.website} onChange={e => setProfile(p => ({ ...p, website: e.target.value }))} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Description</Label>
                  <Textarea value={profile.description} onChange={e => setProfile(p => ({ ...p, description: e.target.value }))} rows={3} />
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
                { key: "investorActivity" as const, label: "Investor Activity", desc: "When investors buy or sell your tokens" },
                { key: "payoutReminders" as const, label: "Payout Reminders", desc: "Upcoming payout schedule alerts" },
                { key: "complianceAlerts" as const, label: "Compliance Alerts", desc: "Regulatory and compliance updates" },
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

export default BusinessProfile;
