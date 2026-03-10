import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useWallet } from "@/contexts/WalletContext";

import ecocashLogo from "@/assets/ecocash-logo.png";
import onemoneyLogo from "@/assets/onemoney-logo.jpeg";
import zimswitchLogo from "@/assets/zimswitch-logo.jpeg";
import visaLogo from "@/assets/visa-logo.png";
import mastercardLogo from "@/assets/mastercard-logo.png";

interface DepositModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type PaymentMethod = "ecocash" | "onemoney" | "zimswitch" | "visa" | "mastercard" | "bank";
type Step = "form" | "processing" | "success" | "error";

const METHODS: { id: PaymentMethod; label: string; logo?: string; type: "mobile" | "card" | "bank" }[] = [
  { id: "ecocash", label: "EcoCash", logo: ecocashLogo, type: "mobile" },
  { id: "onemoney", label: "OneMoney", logo: onemoneyLogo, type: "mobile" },
  { id: "zimswitch", label: "ZimSwitch", logo: zimswitchLogo, type: "card" },
  { id: "visa", label: "Visa", logo: visaLogo, type: "card" },
  { id: "mastercard", label: "Mastercard", logo: mastercardLogo, type: "card" },
  { id: "bank", label: "Bank Transfer", type: "bank" },
];

const PRESETS = [10, 25, 50, 100, 250, 500];

const DepositModal = ({ open, onOpenChange }: DepositModalProps) => {
  const [amount, setAmount] = useState<number>(50);
  const [method, setMethod] = useState<PaymentMethod>("ecocash");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<Step>("form");
  const { toast } = useToast();
  const { format } = useCurrency();
  const { deposit } = useWallet();

  const selectedMethod = METHODS.find((m) => m.id === method)!;
  const isMobile = selectedMethod.type === "mobile";

  const handleSubmit = () => {
    if (amount <= 0) {
      toast({ title: "Invalid amount", description: "Enter an amount greater than $0", variant: "destructive" });
      return;
    }
    if (isMobile && (!phone || phone.length < 10)) {
      toast({ title: "Invalid phone number", description: "Enter a valid mobile number", variant: "destructive" });
      return;
    }

    setStep("processing");

    // Simulate Paynow payment flow
    setTimeout(() => {
      deposit(amount, selectedMethod.label);
      setStep("success");
      toast({ title: "Deposit successful!", description: `${format(amount)} added to your wallet via ${selectedMethod.label}` });
    }, 3000);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep("form");
      setAmount(50);
      setPhone("");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">Deposit Funds</DialogTitle>
          <DialogDescription>Add money to your DePeer wallet</DialogDescription>
        </DialogHeader>

        {step === "form" && (
          <div className="space-y-5 pt-2">
            {/* Amount */}
            <div>
              <Label className="text-sm mb-2 block font-medium">Amount (USD)</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setAmount(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      amount === p
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/50 text-muted-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    ${p}
                  </button>
                ))}
              </div>
              <Input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="text-center font-semibold text-lg"
                placeholder="Enter amount"
              />
            </div>

            {/* Payment method with logos */}
            <div>
              <Label className="text-sm mb-3 block font-medium">Payment Method</Label>
              <div className="grid grid-cols-3 gap-2">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border cursor-pointer transition-all text-center ${
                      method === m.id
                        ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                        : "border-border hover:border-accent/40"
                    }`}
                  >
                    {m.logo ? (
                      <img src={m.logo} alt={m.label} className="h-8 w-auto object-contain" />
                    ) : (
                      <div className="h-8 flex items-center justify-center">
                        <span className="text-xs font-bold text-muted-foreground">🏦</span>
                      </div>
                    )}
                    <span className="text-xs font-semibold">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Phone input for mobile money */}
            {isMobile && (
              <div>
                <Label htmlFor="deposit-phone" className="text-sm mb-2 block">Mobile Number</Label>
                <Input
                  id="deposit-phone"
                  placeholder="07XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={15}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You'll receive a payment prompt on this number
                </p>
              </div>
            )}

            {/* Card input placeholder for card methods */}
            {selectedMethod.type === "card" && (
              <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground text-center">
                <p>You will be redirected to a secure payment page to complete your {selectedMethod.label} payment.</p>
              </div>
            )}

            {/* Bank transfer info */}
            {selectedMethod.type === "bank" && (
              <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
                <p className="font-medium">Bank Transfer Details</p>
                <p className="text-muted-foreground text-xs">Transfer to the account below. Funds will be credited once confirmed (usually within 24 hours).</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Bank:</span><span className="font-medium">CBZ Bank</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Account:</span><span className="font-medium">1234567890</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Reference:</span><span className="font-medium">DEP-{Date.now().toString(36).toUpperCase()}</span></div>
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="rounded-lg bg-muted p-4 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Deposit amount</span>
              <span className="font-display text-xl font-bold">{format(amount)}</span>
            </div>

            <Button onClick={handleSubmit} className="w-full bg-accent hover:bg-accent/90 text-white font-semibold h-11 text-base">
              Deposit {format(amount)}
            </Button>
          </div>
        )}

        {step === "processing" && (
          <div className="py-12 text-center space-y-4">
            <Loader2 size={48} className="mx-auto animate-spin text-accent" />
            <div>
              <p className="font-semibold text-lg">Processing deposit</p>
              <p className="text-sm text-muted-foreground mt-1">
                {isMobile
                  ? `Check your phone and approve the ${selectedMethod.label} payment of ${format(amount)}`
                  : `Processing your ${selectedMethod.label} payment of ${format(amount)}`}
              </p>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 size={48} className="mx-auto text-green-500" />
            <div>
              <p className="font-semibold text-lg">Deposit Successful!</p>
              <p className="text-sm text-muted-foreground mt-1">
                {format(amount)} has been added to your wallet
              </p>
            </div>
            <Button onClick={handleClose} variant="outline" className="mt-4">Done</Button>
          </div>
        )}

        {step === "error" && (
          <div className="py-12 text-center space-y-4">
            <AlertCircle size={48} className="mx-auto text-destructive" />
            <div>
              <p className="font-semibold text-lg">Deposit Failed</p>
              <p className="text-sm text-muted-foreground mt-1">Something went wrong. Please try again.</p>
            </div>
            <Button onClick={() => setStep("form")} className="mt-4">Try Again</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DepositModal;
