import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, BarChart3, Eye, Search, RefreshCw, Filter } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";

const businesses = [
  {
    name: "Nala Logistics",
    sector: "Transport & Logistics",
    tokens: "Revenue",
    price: "$15/token",
    risk: 3,
    revenue: "$120K/mo",
    available: 500,
    location: "Nairobi, Kenya",
    founded: "2019",
    employees: "45",
    growth: "+18%",
    initials: "NL",
    color: "from-[hsl(200,70%,45%)] to-[hsl(220,40%,25%)]",
  },
  {
    name: "Mombasa Farms",
    sector: "Agriculture",
    tokens: "Asset",
    price: "$20/token",
    risk: 5,
    revenue: "$85K/mo",
    available: 300,
    location: "Mombasa, Kenya",
    founded: "2017",
    employees: "120",
    growth: "+12%",
    initials: "MF",
    color: "from-[hsl(160,60%,40%)] to-[hsl(160,50%,30%)]",
  },
  {
    name: "TechHub Lagos",
    sector: "Technology",
    tokens: "Equity",
    price: "$20/token",
    risk: 7,
    revenue: "$200K/mo",
    available: 1000,
    location: "Lagos, Nigeria",
    founded: "2021",
    employees: "32",
    growth: "+45%",
    initials: "TL",
    color: "from-[hsl(260,50%,50%)] to-[hsl(280,40%,35%)]",
  },
  {
    name: "Zanzibar Tours",
    sector: "Tourism",
    tokens: "Revenue",
    price: "$12/token",
    risk: 4,
    revenue: "$95K/mo",
    available: 800,
    location: "Zanzibar, Tanzania",
    founded: "2018",
    employees: "28",
    growth: "+22%",
    initials: "ZT",
    color: "from-[hsl(30,70%,50%)] to-[hsl(30,60%,35%)]",
  },
  {
    name: "Kampala Retail",
    sector: "Retail",
    tokens: "Asset",
    price: "$18/token",
    risk: 6,
    revenue: "$150K/mo",
    available: 600,
    location: "Kampala, Uganda",
    founded: "2020",
    employees: "75",
    growth: "+15%",
    initials: "KR",
    color: "from-[hsl(120,50%,45%)] to-[hsl(120,40%,30%)]",
  },
  {
    name: "Johannesburg Mining",
    sector: "Mining",
    tokens: "Equity",
    price: "$25/token",
    risk: 8,
    revenue: "$300K/mo",
    available: 400,
    location: "Johannesburg, South Africa",
    founded: "2016",
    employees: "200",
    growth: "+8%",
    initials: "JM",
    color: "from-[hsl(0,50%,50%)] to-[hsl(0,40%,35%)]",
  },
];

const Marketplace = () => {
  const { format } = useCurrency();
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const isPulling = useRef(false);

  const sectors = useMemo(() => ["All", ...Array.from(new Set(businesses.map(b => b.sector)))], []);

  const filtered = useMemo(() => {
    return businesses.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
                           b.sector.toLowerCase().includes(search.toLowerCase());
      const matchesSector = sectorFilter === "All" || b.sector === sectorFilter;
      return matchesSearch && matchesSector;
    });
  }, [search, sectorFilter]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Pull to refresh functionality
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (container.scrollTop === 0) {
        startY.current = e.touches[0].clientY;
        isPulling.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling.current || container.scrollTop > 0) return;

      const currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - startY.current);
      const maxPull = 80;

      if (distance > 0) {
        setPullDistance(Math.min(distance * 0.5, maxPull));
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > 40) {
        handleRefresh();
      }
      setPullDistance(0);
      isPulling.current = false;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 pb-24 overflow-y-auto">
      {/* Pull to Refresh Indicator */}
      <AnimatePresence>
        {pullDistance > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-center"
          >
            <RefreshCw
              size={16}
              className={`mr-2 ${pullDistance > 40 ? 'text-accent' : 'text-gray-400'} transition-colors`}
              style={{
                transform: `rotate(${Math.min(pullDistance * 4.5, 180)}deg)`
              }}
            />
            <span className={`text-sm ${pullDistance > 40 ? 'text-accent' : 'text-gray-400'}`}>
              {pullDistance > 40 ? 'Release to refresh' : 'Pull to refresh'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Refreshing Overlay */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-3">
              <RefreshCw size={24} className="text-accent animate-spin" />
              <span className="text-sm text-gray-600">Refreshing...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-display text-2xl font-bold text-navy">Token Marketplace</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="p-2"
            >
              <Filter size={16} />
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">Browse and invest in tokenised African SMEs</p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3 mb-6">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search businesses..."
              className="pl-10 h-12 text-base"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-lg border p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Sector</label>
                  <select
                    value={sectorFilter}
                    onChange={e => setSectorFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent h-10"
                  >
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filtered.length} business{filtered.length !== 1 ? 'es' : ''} available
          </p>
        </div>

        {/* Business Cards */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 text-muted-foreground"
          >
            <Search size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No businesses match your filters</p>
            <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b, index) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all overflow-hidden active:scale-[0.98] transition-transform">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white font-display font-bold text-sm shrink-0`}>
                        {b.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-base font-display">{b.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs shrink-0">{b.tokens}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{b.sector}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <MapPin size={10} />
                          <span>{b.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs">Price</div>
                        <div className="font-semibold">{b.price}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Revenue</div>
                        <div className="font-semibold">{b.revenue}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Available</div>
                        <div className="font-semibold">{b.available} tokens</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Growth</div>
                        <div className="font-semibold text-green-600">{b.growth}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-3">
                      <span className="flex items-center gap-1"><Calendar size={10} /> Est. {b.founded}</span>
                      <span className="flex items-center gap-1"><Users size={10} /> {b.employees} staff</span>
                      <span className="flex items-center gap-1 ml-auto">
                        <BarChart3 size={10} /> Risk {b.risk}/10
                      </span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" className="flex-1 text-sm font-semibold h-11">
                        <Eye size={14} className="mr-1" /> View Details
                      </Button>
                      <Button className="flex-1 bg-accent hover:bg-accent/90 text-white text-sm font-semibold h-11">
                        Invest Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;