import { useCurrency, CurrencyCode } from "@/contexts/CurrencyContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const labels: Record<CurrencyCode, string> = {
  USD: "USD ($)",
  KES: "KES (KSh)",
  NGN: "NGN (₦)",
  ZAR: "ZAR (R)",
};

const CurrencySelector = ({ className }: { className?: string }) => {
  const { currency, setCurrency, currencies } = useCurrency();

  return (
    <Select value={currency} onValueChange={(v) => setCurrency(v as CurrencyCode)}>
      <SelectTrigger className={className ?? "w-24 h-7 text-xs bg-white/5 border-white/10 text-white/70"}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map(c => (
          <SelectItem key={c} value={c} className="text-xs">{labels[c]}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
