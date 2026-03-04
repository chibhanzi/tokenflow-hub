import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { priceHistoryData } from "@/data/priceHistory";
import { useCurrency } from "@/contexts/CurrencyContext";

interface PriceChartProps {
  businessName: string;
}

const PriceChart = ({ businessName }: PriceChartProps) => {
  const data = priceHistoryData[businessName];
  const { format, convert } = useCurrency();

  if (!data) return null;

  const converted = data.map(d => ({ ...d, price: convert(d.price) }));
  const priceChange = ((data[data.length - 1].price - data[0].price) / data[0].price * 100).toFixed(1);
  const isPositive = parseFloat(priceChange) >= 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-display">Price History</CardTitle>
          <span className={`text-sm font-semibold ${isPositive ? "text-success" : "text-destructive"}`}>
            {isPositive ? "+" : ""}{priceChange}% (6mo)
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="price">
          <TabsList className="mb-4 h-8">
            <TabsTrigger value="price" className="text-xs">Price</TabsTrigger>
            <TabsTrigger value="volume" className="text-xs">Volume</TabsTrigger>
          </TabsList>
          <TabsContent value="price">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={converted}>
                  <defs>
                    <linearGradient id={`grad-${businessName}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(200 70% 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(200 70% 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 88%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
                  <Tooltip formatter={(v: number) => format(v / (converted[0]?.price / data[0].price || 1))} />
                  <Area type="monotone" dataKey="price" stroke="hsl(200 70% 50%)" fill={`url(#grad-${businessName})`} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="volume">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 88%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(220 10% 46%)" />
                  <Tooltip />
                  <Bar dataKey="volume" fill="hsl(220 40% 25%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
