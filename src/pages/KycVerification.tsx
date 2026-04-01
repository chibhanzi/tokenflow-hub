import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart3, Coins, History, GitCompare, CreditCard, ArrowLeft, Shield, ShieldCheck, ShieldAlert, Upload, CheckCircle2, Camera, FileText, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useKyc, KYC_LIMITS, KYC_TIER_LABELS, type KycTier } from "@/contexts/KycContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/investor", label: "Portfolio", icon: BarChart3 },
  { to: "/investor/marketplace", label: "Marketplace", icon: Coins },
  { to: "/investor/transactions", label: "Transactions", icon: History },
  { to: "/investor/compare", label: "Compare", icon: GitCompare },
  { to: "/investor/payouts", label: "Payouts", icon: CreditCard },
];

const TIERS: { tier: KycTier; icon: typeof Shield; color: string; bgColor: string; requirements: string[] }[] = [
  {
    tier: "none",
    icon: ShieldAlert,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10 border-orange-500/20",
    requirements: ["No verification needed"],
  },
  {
    tier: "basic",
    icon: Shield,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10 border-blue-500/20",
    requirements: ["Government-issued ID", "Selfie photo"],
  },
  {
    tier: "full",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    requirements: ["Basic KYC completed", "Address verification", "Enhanced due diligence"],
  },
];

const formatLimit = (n: number) => (n === Infinity ? "Unlimited" : `$${n.toLocaleString()}`);

const KycVerification = () => {
  const navigate = useNavigate();
  const { tier, submitKyc, upgradeToFull, limits, withdrawnToday, withdrawnThisWeek, withdrawnThisMonth } = useKyc();
  const { toast } = useToast();
  const [idFile, setIdFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitKyc = () => {
    if (!idFile || !selfieFile) {
      toast({ title: "Missing documents", description: "Please upload both your ID and selfie", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      submitKyc({ idFileName: idFile.name, selfieFileName: selfieFile.name });
      setSubmitting(false);
      toast({ title: "KYC Approved!", description: "Your Basic KYC has been verified. Withdrawal limits have been increased." });
    }, 2000);
  };

  const tierIndex = tier === "none" ? 0 : tier === "basic" ? 1 : 2;
  const progress = tier === "none" ? 10 : tier === "basic" ? 60 : 100;

  return (
    <DashboardLayout title="Investor Dashboard" navItems={navItems}>
      <Button variant="ghost" size="sm" className="mb-4 -ml-2 gap-1 text-muted-foreground" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </Button>

      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">KYC Verification</h1>
        <p className="text-muted-foreground text-sm mt-1">Verify your identity to unlock higher withdrawal limits</p>
      </div>

      {/* Current status */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {tier === "none" && <ShieldAlert size={24} className="text-orange-500" />}
              {tier === "basic" && <Shield size={24} className="text-blue-500" />}
              {tier === "full" && <ShieldCheck size={24} className="text-emerald-500" />}
              <div>
                <p className="font-semibold">{KYC_TIER_LABELS[tier]}</p>
                <p className="text-xs text-muted-foreground">Current verification level</p>
              </div>
            </div>
            <Badge variant={tier === "full" ? "default" : "secondary"} className={cn(
              tier === "full" && "bg-emerald-500 hover:bg-emerald-600"
            )}>
              Tier {tierIndex + 1}/3
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Withdrawal limits */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">Your Withdrawal Limits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Daily", limit: limits.daily, used: withdrawnToday },
              { label: "Weekly", limit: limits.weekly, used: withdrawnThisWeek },
              { label: "Monthly", limit: limits.monthly, used: withdrawnThisMonth },
            ].map((l) => (
              <div key={l.label} className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">{l.label}</p>
                <p className="font-bold text-sm">{formatLimit(l.limit)}</p>
                {l.limit !== Infinity && (
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Used: ${l.used.toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tier comparison */}
      <h2 className="font-display text-lg font-bold mb-4">Verification Tiers</h2>
      <div className="grid gap-4 mb-8">
        {TIERS.map((t, i) => {
          const l = KYC_LIMITS[t.tier];
          const isCurrent = t.tier === tier;
          const isCompleted = tierIndex > i;
          const Icon = t.icon;

          return (
            <Card key={t.tier} className={cn(
              "transition-all",
              isCurrent && "ring-2 ring-primary",
              isCompleted && "opacity-70"
            )}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-lg border", t.bgColor)}>
                    <Icon size={20} className={t.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm">{KYC_TIER_LABELS[t.tier]}</p>
                      {isCurrent && <Badge variant="outline" className="text-[10px]">Current</Badge>}
                      {isCompleted && <CheckCircle2 size={14} className="text-emerald-500" />}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                      <div>
                        <span className="text-muted-foreground">Daily:</span>{" "}
                        <span className="font-semibold">{formatLimit(l.daily)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Weekly:</span>{" "}
                        <span className="font-semibold">{formatLimit(l.weekly)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Monthly:</span>{" "}
                        <span className="font-semibold">{formatLimit(l.monthly)}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {t.requirements.map((r) => (
                        <span key={r} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* KYC Upload form */}
      {tier === "none" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Upload size={18} /> Submit Basic KYC
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border-2 border-dashed border-border p-4">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Government-issued ID</p>
                  <p className="text-xs text-muted-foreground">Passport, national ID, or driver's license</p>
                </div>
                <label className="cursor-pointer">
                  <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => setIdFile(e.target.files?.[0] || null)} />
                  <div className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                    idFile ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted hover:bg-muted/80 text-foreground border-border"
                  )}>
                    {idFile ? `✓ ${idFile.name}` : "Upload"}
                  </div>
                </label>
              </div>
            </div>

            <div className="rounded-lg border-2 border-dashed border-border p-4">
              <div className="flex items-center gap-3">
                <Camera size={20} className="text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Selfie Photo</p>
                  <p className="text-xs text-muted-foreground">Clear photo of your face for identity match</p>
                </div>
                <label className="cursor-pointer">
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelfieFile(e.target.files?.[0] || null)} />
                  <div className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                    selfieFile ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted hover:bg-muted/80 text-foreground border-border"
                  )}>
                    {selfieFile ? `✓ ${selfieFile.name}` : "Upload"}
                  </div>
                </label>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" />
              <p className="text-xs">Documents are reviewed instantly for demo purposes. In production, verification takes 24–48 hours.</p>
            </div>

            <Button
              onClick={handleSubmitKyc}
              disabled={!idFile || !selfieFile || submitting}
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold h-11"
            >
              {submitting ? "Verifying..." : "Submit for Verification"}
            </Button>
          </CardContent>
        </Card>
      )}

      {tier === "basic" && (
        <Card>
          <CardContent className="p-5 text-center space-y-3">
            <CheckCircle2 size={40} className="mx-auto text-blue-500" />
            <p className="font-semibold">Basic KYC Complete</p>
            <p className="text-sm text-muted-foreground">You've unlocked higher withdrawal limits.</p>
            <Button onClick={upgradeToFull} variant="outline" className="gap-2">
              <ShieldCheck size={16} /> Upgrade to Full Verification
            </Button>
          </CardContent>
        </Card>
      )}

      {tier === "full" && (
        <Card>
          <CardContent className="p-5 text-center space-y-3">
            <ShieldCheck size={40} className="mx-auto text-emerald-500" />
            <p className="font-semibold">Fully Verified</p>
            <p className="text-sm text-muted-foreground">You have unlimited withdrawal access.</p>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default KycVerification;
