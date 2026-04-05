import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, X } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

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
];

const ComparisonPage = () => {
  const [selected, setSelected] = useState<(typeof businesses)[]>([]);
  const { format } = useCurrency();

  const toggleSelect = (business: typeof businesses[0]) => {
    setSelected(prev => 
      prev.find(b => b.name === business.name)
        ? prev.filter(b => b.name !== business.name)
        : [...prev, business]
    );
  };

  const comparisonMetrics = useMemo(() => {
    if (selected.length === 0) return [];
    
    return [
      { label: "Token Type", key: "tokens" },
      { label: "Price", key: "price" },
      { label: "Monthly Revenue", key: "revenue" },
      { label: "Risk Level", key: "risk" },
      { label: "Available Tokens", key: "available" },
      { label: "Growth", key: "growth" },
      { label: "Founded", key: "founded" },
      { label: "Employees", key: "employees" },
      { label: "Location", key: "location" },
    ];
  }, [selected]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-navy mb-2">Compare Businesses</h1>
          <p className="text-muted-foreground text-sm">
            Select up to 3 businesses to compare side by side
          </p>
        </div>

        {selected.length > 0 && (
          <div className="mb-6 bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
            <div className="text-sm font-medium text-navy mb-3">
              Comparing {selected.length} business{selected.length > 1 ? "es" : ""}
            </div>
            
            {/* Selected Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {comparisonMetrics.map((metric) => (
                    <tr key={metric.label} className="border-b border-gray-200 last:border-b-0">
                      <td className="font-medium text-gray-700 py-2 pr-4 min-w-[120px]">
                        {metric.label}
                      </td>
                      {selected.map((business) => (
                        <td
                          key={business.name}
                          className="py-2 px-2 text-center text-gray-600"
                        >
                          <div className="font-semibold text-navy">
                            {business[metric.key as keyof typeof business]}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="py-3 pr-4"></td>
                    {selected.map((business) => (
                      <td key={business.name} className="py-3 px-2 text-center">
                        <Button
                          size="sm"
                          className="bg-accent hover:bg-accent/90 text-white text-xs"
                        >
                          Invest Now
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelected([])}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {businesses.map((business) => {
            const isSelected = selected.find(b => b.name === business.name);
            return (
              <Card
                key={business.name}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? "border-navy border-2 bg-navy/5 shadow-lg"
                    : "hover:border-navy/30 hover:shadow-lg"
                } ${selected.length >= 3 && !isSelected ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => {
                  if (selected.length < 3 || isSelected) {
                    toggleSelect(business);
                  }
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base">{business.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">{business.sector}</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-navy text-white rounded-full flex items-center justify-center flex-shrink-0">
                        <ArrowRight size={14} />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Price:</span>
                      <p className="font-semibold text-navy">{business.price}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <p className="font-semibold text-navy">{business.tokens}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Revenue:</span>
                      <p className="font-semibold text-navy">{business.revenue}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Risk:</span>
                      <p className="font-semibold text-orange-600">{business.risk}/10</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selected.length > 0 && (
          <div className="mt-8 text-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold">
              Compare Selected & Invest
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;