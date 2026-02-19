import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const MarketplaceFilters = ({
  sectors, tokenTypes, sectorFilter, tokenFilter, sortBy,
  onSectorChange, onTokenChange, onSortChange,
}: MarketplaceFiltersProps) => (
  <div className="flex flex-wrap items-center gap-3 mb-6">
    <Select value={sectorFilter} onValueChange={onSectorChange}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Sector" />
      </SelectTrigger>
      <SelectContent>
        {sectors.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
      </SelectContent>
    </Select>

    <Select value={tokenFilter} onValueChange={onTokenChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Token Type" />
      </SelectTrigger>
      <SelectContent>
        {tokenTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
      </SelectContent>
    </Select>

    <Select value={sortBy} onValueChange={onSortChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name">Name</SelectItem>
        <SelectItem value="price">Price</SelectItem>
        <SelectItem value="risk">Risk</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default MarketplaceFilters;
