import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

interface MarketplaceFiltersProps {
  sectors: string[];
  tokenTypes: string[];
  sectorFilter: string;
  tokenFilter: string;
  sortBy: string;
  onSectorChange: (v: string) => void;
  onTokenChange: (v: string) => void;
  onSortChange: (v: string) => void;
}

const ChipGroup = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <span className="text-xs font-medium text-muted-foreground mr-2">{label}:</span>
    <div className="inline-flex flex-wrap gap-1.5 mt-1">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
            value === opt
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const MarketplaceFilters = ({
  sectors, tokenTypes, sectorFilter, tokenFilter, sortBy,
  onSectorChange, onTokenChange, onSortChange,
}: MarketplaceFiltersProps) => (
  <div className="space-y-3 mb-6 p-4 rounded-xl bg-card border border-border">
    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
      <ChipGroup label="Sector" options={sectors} value={sectorFilter} onChange={onSectorChange} />
      <ChipGroup label="Token" options={tokenTypes} value={tokenFilter} onChange={onTokenChange} />
    </div>
    <div className="flex items-center gap-2 pt-1 border-t border-border/50">
      <ArrowUpDown size={12} className="text-muted-foreground" />
      <span className="text-xs text-muted-foreground">Sort:</span>
      {["name", "price", "risk"].map((s) => (
        <button
          key={s}
          onClick={() => onSortChange(s)}
          className={cn(
            "px-2.5 py-1 rounded text-xs font-medium transition-colors capitalize",
            sortBy === s
              ? "bg-accent/10 text-accent"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {s}
        </button>
      ))}
    </div>
  </div>
);

export default MarketplaceFilters;
