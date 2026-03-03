import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle, XCircle, Globe, MapPin, Calendar, Users, DollarSign,
  Building2, FileText, ShieldCheck, ShieldX, ExternalLink, User, Briefcase
} from "lucide-react";
import { BusinessApplication } from "@/data/businessApplications";

interface BusinessReviewSheetProps {
  business: BusinessApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const statusColor = {
  Pending: "secondary" as const,
  Approved: "default" as const,
  Rejected: "destructive" as const,
  Suspended: "destructive" as const,
};

const BusinessReviewSheet = ({ business, open, onOpenChange, onApprove, onReject }: BusinessReviewSheetProps) => {
  if (!business) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[540px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 size={22} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="font-display text-lg">{business.name}</SheetTitle>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm text-muted-foreground">{business.sector}</span>
                <Badge variant={statusColor[business.status]} className="text-xs">{business.status}</Badge>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-5">
          {/* Description */}
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">{business.description}</p>
          </div>

          <Separator />

          {/* Company Details */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Company Details</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: FileText, label: "Reg. Number", value: business.registrationNumber },
                { icon: MapPin, label: "Location", value: `${business.city}, ${business.country}` },
                { icon: Calendar, label: "Founded", value: business.foundedYear },
                { icon: Users, label: "Employees", value: business.employeeCount },
                { icon: DollarSign, label: "Annual Revenue", value: business.annualRevenue },
                { icon: Briefcase, label: "Funding Stage", value: business.fundingStage },
              ].map(item => (
                <div key={item.label} className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <item.icon size={12} /> {item.label}
                  </div>
                  <div className="font-semibold text-sm">{item.value}</div>
                </div>
              ))}
            </div>
            {business.website && (
              <a href={business.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-primary hover:underline mt-3">
                <Globe size={14} /> {business.website} <ExternalLink size={11} />
              </a>
            )}
          </div>

          <Separator />

          {/* Owner */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Business Owner</h3>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <User size={16} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-sm">{business.ownerName}</div>
                <div className="text-xs text-muted-foreground">{business.ownerEmail}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Directors */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
              Directors ({business.directors.length})
            </h3>
            <div className="space-y-2">
              {business.directors.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div>
                    <div className="font-medium text-sm">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">{d.idType}</div>
                    <div className="text-xs text-muted-foreground">{d.nationality}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Token Intent */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Token Issuance Intent</h3>
            <Card>
              <CardContent className="p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <Badge variant="secondary">{business.tokenIntent.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Supply</span>
                  <span className="font-semibold">{business.tokenIntent.amount} tokens</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold">{business.tokenIntent.pricePerToken}</span>
                </div>
                <Separator />
                <div>
                  <span className="text-xs text-muted-foreground">Backing</span>
                  <p className="text-sm mt-0.5">{business.tokenIntent.backingDescription}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Compliance */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Compliance</h3>
            <div className="space-y-2">
              {[
                { label: "Terms & Conditions", ok: business.compliance.termsAccepted },
                { label: "AML/KYC Compliance", ok: business.compliance.amlCompliance },
                { label: "Accredited Investors Only", ok: business.compliance.accreditedOnly },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-2 text-sm">
                  {c.ok ? <ShieldCheck size={15} className="text-accent" /> : <ShieldX size={15} className="text-destructive" />}
                  <span className={c.ok ? "" : "text-destructive"}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Documents */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
              Submitted Documents ({business.documents.length})
            </h3>
            <div className="space-y-1.5">
              {business.documents.map((doc, i) => (
                <div key={i} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/50">
                  <FileText size={14} className="text-muted-foreground shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Actions */}
          {business.status === "Pending" && (
            <div className="grid grid-cols-2 gap-3 pb-6">
              <Button className="gradient-navy text-primary-foreground font-semibold gap-1.5"
                onClick={() => { onApprove(business.id); onOpenChange(false); }}>
                <CheckCircle size={15} /> Approve
              </Button>
              <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/5 font-semibold gap-1.5"
                onClick={() => { onReject(business.id); onOpenChange(false); }}>
                <XCircle size={15} /> Reject
              </Button>
            </div>
          )}

          {business.status !== "Pending" && (
            <div className="pb-6">
              <p className="text-sm text-muted-foreground text-center">
                This business has been <span className="font-semibold">{business.status.toLowerCase()}</span>.
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BusinessReviewSheet;
