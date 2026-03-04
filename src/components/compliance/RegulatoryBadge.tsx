import { Shield, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Regulation {
  country: string;
  body: string;
  status: "compliant" | "pending" | "not_applicable";
  license?: string;
  url: string;
}

const regulations: Record<string, Regulation[]> = {
  "Kenya": [
    { country: "Kenya", body: "Capital Markets Authority (CMA)", status: "compliant", license: "CMA/LIC/2025/0042", url: "https://www.cma.or.ke" },
    { country: "Kenya", body: "Central Bank of Kenya", status: "compliant", license: "CBK/FIN/2024/189", url: "https://www.centralbank.go.ke" },
  ],
  "Nigeria": [
    { country: "Nigeria", body: "Securities & Exchange Commission (SEC)", status: "compliant", license: "SEC/REG/2025/1234", url: "https://sec.gov.ng" },
    { country: "Nigeria", body: "Central Bank of Nigeria", status: "pending", url: "https://www.cbn.gov.ng" },
  ],
  "Ghana": [
    { country: "Ghana", body: "Securities & Exchange Commission", status: "compliant", license: "SEC-GH/2025/078", url: "https://sec.gov.gh" },
    { country: "Ghana", body: "Bank of Ghana", status: "compliant", license: "BOG/FIN/2025/456", url: "https://www.bog.gov.gh" },
  ],
  "South Africa": [
    { country: "South Africa", body: "Financial Sector Conduct Authority (FSCA)", status: "compliant", license: "FSCA/FSP/52891", url: "https://www.fsca.co.za" },
    { country: "South Africa", body: "South African Reserve Bank", status: "pending", url: "https://www.resbank.co.za" },
  ],
  "Tanzania": [
    { country: "Tanzania", body: "Capital Markets & Securities Authority", status: "pending", url: "https://www.cmsa.go.tz" },
  ],
};

const statusColors = {
  compliant: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  not_applicable: "bg-muted text-muted-foreground border-border",
};

const statusLabels = {
  compliant: "Compliant",
  pending: "Pending",
  not_applicable: "N/A",
};

interface RegulatoryBadgeProps {
  location: string;
}

const RegulatoryBadge = ({ location }: RegulatoryBadgeProps) => {
  // Extract country from location like "Nairobi, Kenya"
  const country = location.split(",").pop()?.trim() || "";
  const countryKey = country === "SA" ? "South Africa" : country;
  const regs = regulations[countryKey] || [];

  if (regs.length === 0) return null;

  const allCompliant = regs.every(r => r.status === "compliant");

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Shield size={16} className={allCompliant ? "text-success" : "text-warning"} />
            Regulatory Compliance
          </CardTitle>
          <Badge className={cn("text-xs border", allCompliant ? statusColors.compliant : statusColors.pending)}>
            {allCompliant ? "Fully Compliant" : "Partial"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {regs.map((r, i) => (
          <div key={i}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-medium">{r.body}</div>
                {r.license && <div className="text-xs text-muted-foreground font-mono mt-0.5">{r.license}</div>}
              </div>
              <div className="flex items-center gap-2">
                <Badge className={cn("text-[10px] border", statusColors[r.status])}>{statusLabels[r.status]}</Badge>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
            {i < regs.length - 1 && <Separator className="mt-3" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RegulatoryBadge;
