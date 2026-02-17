import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Business {
  name: string;
  sector: string;
  tokens: string;
  price: string;
  risk: number;
  revenue: string;
  available: number;
}

interface BuyTokenModalProps {
  business: Business | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BuyTokenModal = ({ business, open, onOpenChange }: BuyTokenModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  if (!business) return null;

  const priceNum = parseFloat(business.price.replace("$", "").replace("/token", ""));
  const total = (priceNum * quantity).toFixed(2);

  const handlePurchase = () => {
    toast({
      title: "Order submitted",
      description: `Purchasing ${quantity} ${business.tokens} token${quantity > 1 ? "s" : ""} from ${business.name} for $${total}. RenexPay integration pending.`,
    });
    onOpenChange(false);
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Buy {business.tokens} Tokens</DialogTitle>
          <DialogDescription>{business.name} · {business.sector}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Price per token</span>
            <span className="font-semibold">${priceNum.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Available</span>
            <span className="font-semibold">{business.available} tokens</span>
          </div>

          <div>
            <Label className="text-sm mb-2 block">Quantity</Label>
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
                max={business.available}
                value={quantity}
                onChange={(e) => {
                  const v = parseInt(e.target.value) || 1;
                  setQuantity(Math.min(Math.max(1, v), business.available));
                }}
                className="w-24 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setQuantity(Math.min(business.available, quantity + 1))}
                disabled={quantity >= business.available}
              >
                <Plus size={14} />
              </Button>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4 flex items-center justify-between">
            <span className="text-sm font-medium">Total</span>
            <span className="font-display text-xl font-bold">${total}</span>
          </div>

          <Button onClick={handlePurchase} className="w-full bg-accent hover:bg-accent/90 text-white font-semibold">
            <Wallet size={16} className="mr-2" />
            Pay with RenexPay
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Payment processing via RenexPay. Tokens will be minted on TON blockchain after confirmation.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyTokenModal;
