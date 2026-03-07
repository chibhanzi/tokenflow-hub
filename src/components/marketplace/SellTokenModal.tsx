import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Holding {
  name: string;
  type: string;
  tokens: number;
  value: string;
  roi: string;
  risk: string;
}

interface SellTokenModalProps {
  holding: Holding | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SellTokenModal = ({ holding, open, onOpenChange }: SellTokenModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  if (!holding) return null;

  const valueNum = parseFloat(holding.value.replace(/[^0-9.]/g, ""));
  const pricePerToken = valueNum / holding.tokens;
  const total = (pricePerToken * quantity).toFixed(2);

  const handleSell = () => {
    toast({
      title: "Sell order submitted",
      description: `Listing ${quantity} ${holding.type} token${quantity > 1 ? "s" : ""} from ${holding.name} for $${total}. You'll be notified when a buyer is matched.`,
    });
    onOpenChange(false);
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Sell {holding.type} Tokens</DialogTitle>
          <DialogDescription>{holding.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Estimated price per token</span>
            <span className="font-semibold">${pricePerToken.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">You hold</span>
            <span className="font-semibold">{holding.tokens} tokens</span>
          </div>

          <div>
            <Label className="text-sm mb-2 block">Quantity to sell</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                { label: "25%", factor: 0.25 },
                { label: "50%", factor: 0.5 },
                { label: "75%", factor: 0.75 },
                { label: "Max", factor: 1 },
              ].map(({ label, factor }) => {
                const qty = Math.max(1, Math.floor(holding.tokens * factor));
                return (
                  <button
                    key={label}
                    onClick={() => setQuantity(qty)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      quantity === qty
                        ? "bg-destructive text-destructive-foreground border-destructive"
                        : "bg-muted/50 text-muted-foreground border-border hover:border-destructive/40"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus size={14} />
              </Button>
              <Input
                type="number"
                min={1}
                max={holding.tokens}
                value={quantity}
                onChange={(e) => {
                  const v = parseInt(e.target.value) || 1;
                  setQuantity(Math.min(Math.max(1, v), holding.tokens));
                }}
                className="w-24 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setQuantity(Math.min(holding.tokens, quantity + 1))}
                disabled={quantity >= holding.tokens}
              >
                <Plus size={14} />
              </Button>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4 flex items-center justify-between">
            <span className="text-sm font-medium">Estimated return</span>
            <span className="font-display text-xl font-bold">${total}</span>
          </div>

          <Button onClick={handleSell} className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold">
            <TrendingDown size={16} className="mr-2" />
            List for Sale
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Tokens will be listed on the marketplace. You'll receive payment via RenexPay once a buyer is matched.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SellTokenModal;
