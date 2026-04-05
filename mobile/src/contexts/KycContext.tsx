import { createContext, useContext, useState, ReactNode } from "react";

export type KycTier = "none" | "basic" | "full";

export interface KycLimits {
  daily: number;
  weekly: number;
  monthly: number;
}

export const KYC_LIMITS: Record<KycTier, KycLimits> = {
  none:  { daily: 200, weekly: 1000, monthly: 3000 },
  basic: { daily: 2000, weekly: 10000, monthly: 30000 },
  full:  { daily: Infinity, weekly: Infinity, monthly: Infinity },
};

export const KYC_TIER_LABELS: Record<KycTier, string> = {
  none: "Unverified",
  basic: "Basic KYC",
  full: "Fully Verified",
};

interface KycDocument {
  type: "id" | "selfie";
  fileName: string;
  uploadedAt: Date;
  status: "pending" | "approved" | "rejected";
}

interface KycContextType {
  tier: KycTier;
  documents: KycDocument[];
  withdrawnToday: number;
  withdrawnThisWeek: number;
  withdrawnThisMonth: number;
  limits: KycLimits;
  canWithdraw: (amount: number) => { allowed: boolean; reason?: string };
  recordWithdrawal: (amount: number) => void;
  submitKyc: (docs: { idFileName: string; selfieFileName: string }) => void;
  upgradeToFull: () => void;
}

const KycContext = createContext<KycContextType | null>(null);

export const KycProvider = ({ children }: { children: ReactNode }) => {
  const [tier, setTier] = useState<KycTier>("none");
  const [documents, setDocuments] = useState<KycDocument[]>([]);
  const [withdrawnToday, setWithdrawnToday] = useState(0);
  const [withdrawnThisWeek, setWithdrawnThisWeek] = useState(0);
  const [withdrawnThisMonth, setWithdrawnThisMonth] = useState(0);

  const limits = KYC_LIMITS[tier];

  const canWithdraw = (amount: number) => {
    if (withdrawnToday + amount > limits.daily)
      return { allowed: false, reason: `Exceeds daily limit of $${limits.daily}. Complete KYC to increase.` };
    if (withdrawnThisWeek + amount > limits.weekly)
      return { allowed: false, reason: `Exceeds weekly limit of $${limits.weekly}. Complete KYC to increase.` };
    if (withdrawnThisMonth + amount > limits.monthly)
      return { allowed: false, reason: `Exceeds monthly limit of $${limits.monthly}. Complete KYC to increase.` };
    return { allowed: true };
  };

  const recordWithdrawal = (amount: number) => {
    setWithdrawnToday((v) => v + amount);
    setWithdrawnThisWeek((v) => v + amount);
    setWithdrawnThisMonth((v) => v + amount);
  };

  const submitKyc = (docs: { idFileName: string; selfieFileName: string }) => {
    const now = new Date();
    setDocuments([
      { type: "id", fileName: docs.idFileName, uploadedAt: now, status: "approved" },
      { type: "selfie", fileName: docs.selfieFileName, uploadedAt: now, status: "approved" },
    ]);
    // Simulate instant approval for demo
    setTier("basic");
  };

  const upgradeToFull = () => setTier("full");

  return (
    <KycContext.Provider value={{
      tier, documents, withdrawnToday, withdrawnThisWeek, withdrawnThisMonth,
      limits, canWithdraw, recordWithdrawal, submitKyc, upgradeToFull,
    }}>
      {children}
    </KycContext.Provider>
  );
};

export const useKyc = () => {
  const ctx = useContext(KycContext);
  if (!ctx) throw new Error("useKyc must be used within KycProvider");
  return ctx;
};