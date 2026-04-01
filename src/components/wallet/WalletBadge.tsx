import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, Plus, Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useWallet } from "@/contexts/WalletContext";
import { useKyc, KYC_TIER_LABELS } from "@/contexts/KycContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import DepositModal from "./DepositModal";

const KycIcon = ({ tier }: { tier: string }) => {
  if (tier === "full") return <ShieldCheck size={12} className="text-emerald-500" />;
  if (tier === "basic") return <Shield size={12} className="text-blue-500" />;
  return <ShieldAlert size={12} className="text-orange-500" />;
};

const WalletBadge = () => {
  const [depositOpen, setDepositOpen] = useState(false);
  const { format } = useCurrency();
  const { balance } = useWallet();
  const { tier } = useKyc();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center gap-1">
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigate("/investor/kyc")}
            >
              <KycIcon tier={tier} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">{KYC_TIER_LABELS[tier]} — Click to manage KYC</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} />
    </>
  );
};

export default WalletBadge;
