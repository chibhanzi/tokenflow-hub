import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Coins, Search, ShieldCheck, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BuyTokenModal from "@/components/marketplace/BuyTokenModal";
import MarketplaceCard from "@/components/marketplace/MarketplaceCard";
import MarketplaceFilters from "@/components/marketplace/MarketplaceFilters";
import { businesses, toSlug } from "@/data/businesses";

import { GitCompare, CreditCard } from "lucide-react";

const navItems = [
  { to: "/investor", label: "Portfolio", icon: TrendingUp },
  { to: "/investor/marketplace", label: "Marketplace", icon: Coins },
  { to: "/investor/transactions", label: "Transactions", icon: ShieldCheck },
  { to: "/investor/compare", label: "Compare", icon: GitCompare },
  { to: "/investor/payouts", label: "Payouts", icon: CreditCard },
];

const Marketplace = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<typeof businesses[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [tokenFilter, setTokenFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const sectors = useMemo(() => ["All", ...Array.from(new Set(businesses.map(b => b.sector)))], []);
  const tokenTypes = useMemo(() => ["All", ...Array.from(new Set(businesses.map(b => b.tokens)))], []);

  const filtered = useMemo(() => {
    let result = businesses.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.sector.toLowerCase().includes(search.toLowerCase());
      const matchesSector = sectorFilter === "All" || b.sector === sectorFilter;
      const matchesToken = tokenFilter === "All" || b.tokens === tokenFilter;
      return matchesSearch && matchesSector && matchesToken;
    });

    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return parseFloat(a.price.replace(/[^0-9.]/g, "")) - parseFloat(b.price.replace(/[^0-9.]/g, ""));
      if (sortBy === "risk") return a.risk - b.risk;
      return 0;
    });

    return result;
  }, [search, sectorFilter, tokenFilter, sortBy]);

  const handleBuy = (b: typeof businesses[0]) => {
    setSelected(b);
    setModalOpen(true);
  };

  return (
    <DashboardLayout title="Investor Dashboard" navItems={navItems}>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Token Marketplace</h1>
        <p className="text-muted-foreground text-sm mt-1">Browse and invest in tokenised African SMEs</p>
        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search businesses..." className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <MarketplaceFilters
        sectors={sectors}
        tokenTypes={tokenTypes}
        sectorFilter={sectorFilter}
        tokenFilter={tokenFilter}
        sortBy={sortBy}
        onSectorChange={setSectorFilter}
        onTokenChange={setTokenFilter}
        onSortChange={setSortBy}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium">No businesses match your filters</p>
          <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((b) => (
            <MarketplaceCard
              key={b.name}
              business={b}
              onView={() => navigate(`/investor/company/${toSlug(b.name)}`)}
              onBuy={() => handleBuy(b)}
              onCompare={() => navigate("/investor/compare")}
            />
          ))}
        </div>
      )}

      <BuyTokenModal business={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </DashboardLayout>
  );
};

export default Marketplace;
