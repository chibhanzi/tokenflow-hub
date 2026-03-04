import { createContext, useContext, useState, ReactNode } from "react";

export type CurrencyCode = "USD" | "KES" | "NGN" | "ZAR";

const FX_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  KES: 129.50,
  NGN: 1580.00,
  ZAR: 18.20,
};

const SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  KES: "KSh",
  NGN: "₦",
  ZAR: "R",
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  convert: (usdAmount: number) => number;
  format: (usdAmount: number, decimals?: number) => string;
  symbol: string;
  rate: number;
  currencies: CurrencyCode[];
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  const rate = FX_RATES[currency];
  const symbol = SYMBOLS[currency];
  const convert = (usd: number) => usd * rate;
  const format = (usd: number, decimals = 2) => {
    const converted = convert(usd);
    if (converted >= 1_000_000) return `${symbol}${(converted / 1_000_000).toFixed(1)}M`;
    if (converted >= 1_000) return `${symbol}${(converted / 1_000).toFixed(1)}K`;
    return `${symbol}${converted.toFixed(decimals)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, format, symbol, rate, currencies: ["USD", "KES", "NGN", "ZAR"] }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
};
