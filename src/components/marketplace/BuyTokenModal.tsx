import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Wallet, AlertTriangle } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";
import DepositModal from "@/components/wallet/DepositModal";

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

const PLATFORM_FEE_PERCENT = 2.5;
const PRESETS = [0.5, 1, 5, 10, 25, 50];

const BuyTokenModal = ({ business, open, onOpenChange }: BuyTokenModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [depositOpen, setDepositOpen] = useState(false);
  const { format } = useCurrency();
  const { balance, deduct } = useWallet();
  const { toast } = useToast();

  if (!business) return null;

  const priceNum = parseFloat(business.price.replace("$", "").replace("/token", ""));
  const subtotal = priceNum * quantity;
  const platformFee = +(subtotal * PLATFORM_FEE_PERCENT / 100).toFixed(2);
  const total = +(subtotal + platformFee).toFixed(2);
  const hasEnough = balance >= total;

  const setQty = (v: number) => setQuantity(Math.min(Math.max(0.1, Math.round(v * 10) / 10), business.available));

  const handleBuy = () => {
    if (!hasEnough) {
      toast({ title: "Insufficient balance", description: "Please deposit funds to your wallet first", variant: "destructive" });
      return;
    }
    const success = deduct(total, `Bought ${quantity} ${business.tokens} tokens from ${business.name}`);
    if (success) {
      toast({ title: "Purchase successful!", description: `You bought ${quantity} ${business.tokens} token${quantity !== 1 ? "s" : ""}` });
      setQuantity(1);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Buy {business.tokens} Tokens</DialogTitle>
            <DialogDescription>{business.name} · {business.sector}</DialogDescription>
          </DialogHeader>

          <div className="space-y-5 pt-2">
            {/* Wallet balance */}
            <div className={`flex items-center justify-between rounded-lg p-3 ${hasEnough ? "bg-accent/5 border border-accent/20" : "bg-destructive/5 border border-destructive/20"}`}>
              <div className="flex items-center gap-2">
                <Wallet size={16} className={hasEnough ? "text-accent" : "text-destructive"} />
                <span className="text-sm font-medium">Wallet Balance</span>
              </div>
              <span className={`font-display font-bold ${hasEnough ? "text-accent" : "text-destructive"}`}>
                {format(balance)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Price per token</div>
                <div className="font-semibold">{format(priceNum)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Available</div>
                <div className="font-semibold">{business.available.toLocaleString()} tokens</div>
              </div>
            </div>

            <div>
              <Label className="text-sm mb-2 block">Quantity <span className="text-muted-foreground text-xs">(min 0.1 — fractional supported)</span></Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESETS.filter(p => p <= business.available).map(p => (
                  <button
                    key={p}
                    onClick={() => setQty(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      quantity === p
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/50 text-muted-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={() => setQty(quantity - 0.1)} disabled={quantity <= 0.1}>
                  <Minus size={14} />
                </Button>
                <Input
                  type="number"
                  min={0.1}
                  max={business.available}
                  step={0.1}
                  value={quantity}
                  onChange={(e) => setQty(parseFloat(e.target.value) || 0.1)}
                  className="text-center font-semibold text-base"
                />
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={() => setQty(quantity + 1)} disabled={quantity >= business.available}>
                  <Plus size={14} />
                </Button>
              </div>
            </div>

            {/* Cost breakdown */}
            <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{format(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform fee (2.5%)</span>
                <span>{format(platformFee)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-border pt-2">
                <span>Total</span>
                <span className="font-display text-xl">{format(total)}</span>
              </div>
            </div>

            {!hasEnough && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm">
                <AlertTriangle size={16} className="text-destructive shrink-0" />
                <div className="flex-1">
                  <span className="text-destructive font-medium">Insufficient funds.</span>{" "}
                  <span className="text-muted-foreground">You need {format(total - balance)} more.</span>
                </div>
                <Button size="sm" variant="outline" className="shrink-0 text-xs h-7" onClick={() => setDepositOpen(true)}>
                  Deposit
                </Button>
              </div>
            )}

            <Button
              onClick={hasEnough ? handleBuy : () => setDepositOpen(true)}
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold h-11 text-base"
            >
              {hasEnough ? (
                <>
                  <Wallet size={16} className="mr-2" />
                  Buy with Wallet — {format(total)}
                </>
              ) : (
                <>
                  <Plus size={16} className="mr-2" />
                  Deposit Funds to Buy
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Tokens are purchased from your platform wallet balance. Deposit via EcoCash, OneMoney, ZimSwitch, Visa, or Mastercard.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} />
    </>
  );
};

export default BuyTokenModal;
