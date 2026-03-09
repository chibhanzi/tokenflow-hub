import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Smartphone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCurrency } from "@/contexts/CurrencyContext";

interface PaynowCheckoutProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  subtotal: number;
  platformFee: number;
  total: number;
  onSuccess?: () => void;
}

type PaymentMethod = "ecocash" | "onemoney" | "innbucks";
type CheckoutStep = "form" | "processing" | "success" | "error";

const PaynowCheckout = ({
  open,
  onOpenChange,
  title,
  description,
  subtotal,
  platformFee,
  total,
  onSuccess,
}: PaynowCheckoutProps) => {
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("ecocash");
  const [step, setStep] = useState<CheckoutStep>("form");
  const { toast } = useToast();
  const { format } = useCurrency();

  const handleSubmit = () => {
    if (!phone || phone.length < 10) {
      toast({ title: "Invalid phone number", description: "Enter a valid mobile number", variant: "destructive" });
      return;
    }

    setStep("processing");

    // Simulate Paynow mobile payment flow
    setTimeout(() => {
      setStep("success");
      toast({ title: "Payment successful!", description: `${format(total)} paid via ${method.charAt(0).toUpperCase() + method.slice(1)}` });
      onSuccess?.();
    }, 3000);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setStep("form"), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {step === "form" && (
          <div className="space-y-5 pt-2">
            {/* Cost breakdown */}
            <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{format(subtotal)}</span>
              </div>
              {platformFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform fee (2.5%)</span>
                  <span>{format(platformFee)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold border-t border-border pt-2 mt-2">
                <span>Total</span>
                <span className="text-accent">{format(total)}</span>
              </div>
            </div>

            {/* Payment method */}
            <div>
              <Label className="text-sm mb-3 block font-medium">Payment Method</Label>
              <RadioGroup value={method} onValueChange={(v) => setMethod(v as PaymentMethod)} className="grid grid-cols-3 gap-2">
                {(["ecocash", "onemoney", "innbucks"] as const).map((m) => (
                  <Label
                    key={m}
                    htmlFor={m}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border cursor-pointer transition-all text-center ${
                      method === m
                        ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                        : "border-border hover:border-accent/40"
                    }`}
                  >
                    <RadioGroupItem value={m} id={m} className="sr-only" />
                    <Smartphone size={18} className={method === m ? "text-accent" : "text-muted-foreground"} />
                    <span className="text-xs font-semibold capitalize">{m}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-sm mb-2 block">Mobile Number</Label>
              <Input
                id="phone"
                placeholder="07XX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={15}
              />
              <p className="text-xs text-muted-foreground mt-1">
                You'll receive a payment prompt on this number
              </p>
            </div>

            <Button onClick={handleSubmit} className="w-full bg-accent hover:bg-accent/90 text-white font-semibold h-11">
              <Smartphone size={16} className="mr-2" />
              Pay {format(total)}
            </Button>
          </div>
        )}

        {step === "processing" && (
          <div className="py-12 text-center space-y-4">
            <Loader2 size={48} className="mx-auto animate-spin text-accent" />
            <div>
              <p className="font-semibold text-lg">Waiting for payment</p>
              <p className="text-sm text-muted-foreground mt-1">
                Check your phone and approve the {method.charAt(0).toUpperCase() + method.slice(1)} payment of {format(total)}
              </p>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 size={48} className="mx-auto text-success" />
            <div>
              <p className="font-semibold text-lg">Payment Successful!</p>
              <p className="text-sm text-muted-foreground mt-1">
                {format(total)} has been processed successfully
              </p>
            </div>
            <Button onClick={handleClose} variant="outline" className="mt-4">
              Done
            </Button>
          </div>
        )}

        {step === "error" && (
          <div className="py-12 text-center space-y-4">
            <AlertCircle size={48} className="mx-auto text-destructive" />
            <div>
              <p className="font-semibold text-lg">Payment Failed</p>
              <p className="text-sm text-muted-foreground mt-1">
                Something went wrong. Please try again.
              </p>
            </div>
            <Button onClick={() => setStep("form")} className="mt-4">
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaynowCheckout;
