import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, BarChart3, Eye, GitCompare } from "lucide-react";

interface Business {
  name: string;
  sector: string;
  tokens: string;
  price: string;
  risk: number;
  revenue: string;
  available: number;
  location: string;
  founded: string;
  employees: string;
  growth: string;
  initials: string;
  color: string;
}

interface MarketplaceCardProps {
  business: Business;
  onView: () => void;
  onBuy: () => void;
  onCompare?: () => void;
}

const MarketplaceCard = ({ business: b, onView, onBuy, onCompare }: MarketplaceCardProps) => (
  <Card className="hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all overflow-hidden">
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
          <div className="font-semibold text-[hsl(var(--success))]">{b.growth}</div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-3">
        <span className="flex items-center gap-1"><Calendar size={10} /> Est. {b.founded}</span>
        <span className="flex items-center gap-1"><Users size={10} /> {b.employees} staff</span>
        <span className="flex items-center gap-1 ml-auto">
          <BarChart3 size={10} /> Risk {b.risk}/10
        </span>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onView} className="flex-1 text-sm font-semibold">
          <Eye size={14} className="mr-1" /> View
        </Button>
        {onCompare && (
          <Button variant="outline" onClick={onCompare} className="text-sm font-semibold px-3" title="Compare">
            <GitCompare size={14} />
          </Button>
        )}
        <Button onClick={onBuy} className="flex-1 bg-accent hover:bg-accent/90 text-white text-sm font-semibold">
          Buy
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default MarketplaceCard;
