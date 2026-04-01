import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, X, Check } from "lucide-react";

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
  <div className="space-y-2">
    <p className="text-sm font-semibold text-foreground">{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5",
            value === opt
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-muted/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
          )}
        >
          {value === opt && <Check size={10} />}
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const MarketplaceFilters = ({
  sectors, tokenTypes, sectorFilter, tokenFilter, sortBy,
  onSectorChange, onTokenChange, onSortChange,
}: MarketplaceFiltersProps) => {
  const [open, setOpen] = useState(false);

  const activeCount = [
    sectorFilter !== "All" ? 1 : 0,
    tokenFilter !== "All" ? 1 : 0,
    sortBy !== "name" ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const handleReset = () => {
    onSectorChange("All");
    onTokenChange("All");
    onSortChange("name");
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative shrink-0">
            <SlidersHorizontal size={16} />
            {activeCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 sm:w-96">
          <SheetHeader className="mb-6">
            <SheetTitle className="font-display text-lg">Filter & Sort</SheetTitle>
          </SheetHeader>

          <div className="space-y-7">
            <ChipGroup label="Sector" options={sectors} value={sectorFilter} onChange={onSectorChange} />
            <ChipGroup label="Token Type" options={tokenTypes} value={tokenFilter} onChange={onTokenChange} />

            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Sort By</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "name", label: "Name" },
                  { value: "price", label: "Price" },
                  { value: "risk", label: "Risk Score" },
                ].map((s) => (
                  <button
                    key={s.value}
                    onClick={() => onSortChange(s.value)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5",
                      sortBy === s.value
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-muted/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {sortBy === s.value && <Check size={10} />}
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex gap-3">
            {activeCount > 0 && (
              <Button variant="outline" className="flex-1 gap-2" onClick={handleReset}>
                <X size={14} /> Reset
              </Button>
            )}
            <Button className="flex-1" onClick={() => setOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Active filter pills */}
      {sectorFilter !== "All" && (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
          {sectorFilter}
          <button onClick={() => onSectorChange("All")} className="hover:opacity-70"><X size={10} /></button>
        </div>
      )}
      {tokenFilter !== "All" && (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
          {tokenFilter}
          <button onClick={() => onTokenChange("All")} className="hover:opacity-70"><X size={10} /></button>
        </div>
      )}
    </div>
  );
};

export default MarketplaceFilters;
