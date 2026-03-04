import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orderBookData } from "@/data/priceHistory";
import { useCurrency } from "@/contexts/CurrencyContext";
import { cn } from "@/lib/utils";

interface OrderBookProps {
  businessName: string;
}

const OrderBook = ({ businessName }: OrderBookProps) => {
  const data = orderBookData[businessName];
  const { symbol, convert } = useCurrency();

  if (!data) return null;

  const maxQty = Math.max(...data.bids.map(b => b.qty), ...data.asks.map(a => a.qty));
  const spread = (data.asks[0].price - data.bids[0].price).toFixed(2);
  const spreadPct = ((data.asks[0].price - data.bids[0].price) / data.bids[0].price * 100).toFixed(2);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-display">Order Book</CardTitle>
          <span className="text-xs text-muted-foreground">
            Spread: {symbol}{convert(parseFloat(spread)).toFixed(2)} ({spreadPct}%)
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Bids */}
          <div>
            <div className="flex justify-between text-xs text-muted-foreground font-medium mb-2 px-1">
              <span>Bid Price</span>
              <span>Qty</span>
            </div>
            <div className="space-y-1">
              {data.bids.map((b, i) => (
                <div key={i} className="relative flex justify-between text-xs py-1 px-1 rounded">
                  <div
                    className="absolute inset-0 bg-success/10 rounded"
                    style={{ width: `${(b.qty / maxQty) * 100}%` }}
                  />
                  <span className="relative text-success font-medium">{symbol}{convert(b.price).toFixed(2)}</span>
                  <span className="relative text-muted-foreground">{b.qty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Asks */}
          <div>
            <div className="flex justify-between text-xs text-muted-foreground font-medium mb-2 px-1">
              <span>Ask Price</span>
              <span>Qty</span>
            </div>
            <div className="space-y-1">
              {data.asks.map((a, i) => (
                <div key={i} className="relative flex justify-between text-xs py-1 px-1 rounded">
                  <div
                    className="absolute inset-0 bg-destructive/10 rounded right-0 left-auto"
                    style={{ width: `${(a.qty / maxQty) * 100}%` }}
                  />
                  <span className="relative text-destructive font-medium">{symbol}{convert(a.price).toFixed(2)}</span>
                  <span className="relative text-muted-foreground">{a.qty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderBook;
