import { useState } from "react";
import { Wallet, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useWallet } from "@/contexts/WalletContext";
import DepositModal from "./DepositModal";

const WalletBadge = () => {
  const [depositOpen, setDepositOpen] = useState(false);
  const { format } = useCurrency();
  const { balance } = useWallet();

  return (
    <>
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 h-8 text-xs font-semibold border-accent/30 hover:border-accent/60"
          onClick={() => setDepositOpen(true)}
        >
          <Wallet size={14} className="text-accent" />
          <span>{format(balance)}</span>
          <Plus size={12} className="text-accent" />
        </Button>
      </div>
      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} />
    </>
  );
};

export default WalletBadge;
