import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IssueTokenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const IssueTokenModal = ({ open, onOpenChange }: IssueTokenModalProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    type: "",
    totalSupply: "",
    pricePerToken: "",
    priceCurrency: "USD",
    backingDescription: "",
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    if (!form.name || !form.type || !form.totalSupply || !form.pricePerToken) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    toast({
      title: "Token submitted for review",
      description: `"${form.name}" (${form.type}) — ${form.totalSupply} tokens at $${form.pricePerToken} each. Pending admin approval.`,
    });
    onOpenChange(false);
    setForm({ name: "", type: "", totalSupply: "", pricePerToken: "", priceCurrency: "USD", backingDescription: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Coins size={20} className="text-primary" /> Issue New Token
          </DialogTitle>
          <DialogDescription>Create a new token offering. It will be reviewed by admin before going live.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div>
            <Label className="text-sm">Token Name *</Label>
            <Input placeholder="e.g. Revenue Token Q2" value={form.name} onChange={e => update("name", e.target.value)} className="mt-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">Token Type *</Label>
              <Select value={form.type} onValueChange={v => update("type", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Share</SelectItem>
                  <SelectItem value="asset">Asset-Backed</SelectItem>
                  <SelectItem value="equity">Equity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Total Supply *</Label>
              <Input type="number" min={1} placeholder="e.g. 1000" value={form.totalSupply} onChange={e => update("totalSupply", e.target.value)} className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">Price per Token ($) *</Label>
              <Input type="number" min={0.01} step={0.01} placeholder="e.g. 25.00" value={form.pricePerToken} onChange={e => update("pricePerToken", e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Currency</Label>
              <Select value={form.priceCurrency} onValueChange={v => update("priceCurrency", v)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="KES">KES</SelectItem>
                  <SelectItem value="NGN">NGN</SelectItem>
                  <SelectItem value="ZAR">ZAR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-sm">Backing Description</Label>
            <Textarea
              placeholder="Describe what backs this token (e.g. 5% monthly revenue share, warehouse asset, equity stake...)"
              value={form.backingDescription}
              onChange={e => update("backingDescription", e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>

          <div className="rounded-lg bg-muted/50 p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total raise potential</span>
              <span className="font-semibold">
                ${form.totalSupply && form.pricePerToken
                  ? (Number(form.totalSupply) * Number(form.pricePerToken)).toLocaleString()
                  : "—"}
              </span>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full gradient-navy text-primary-foreground font-semibold h-11">
            Submit for Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IssueTokenModal;
