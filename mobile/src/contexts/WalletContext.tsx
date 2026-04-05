import { createContext, useContext, useState, ReactNode } from "react";

interface Transaction {
  id: string;
  type: "deposit" | "purchase" | "sale" | "withdrawal";
  amount: number;
  description: string;
  date: Date;
  method?: string;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  deposit: (amount: number, method: string, description?: string) => void;
  deduct: (amount: number, description?: string) => boolean;
  credit: (amount: number, description?: string) => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTx = (tx: Omit<Transaction, "id" | "date">) => {
    setTransactions((prev) => [
      { ...tx, id: crypto.randomUUID(), date: new Date() },
      ...prev,
    ]);
  };

  const deposit = (amount: number, method: string, description?: string) => {
    setBalance((b) => +(b + amount).toFixed(2));
    addTx({ type: "deposit", amount, method, description: description || `Deposit via ${method}` });
  };

  const deduct = (amount: number, description?: string): boolean => {
    if (balance < amount) return false;
    setBalance((b) => +(b - amount).toFixed(2));
    addTx({ type: "purchase", amount: -amount, description: description || "Token purchase" });
    return true;
  };

  const credit = (amount: number, description?: string) => {
    setBalance((b) => +(b + amount).toFixed(2));
    addTx({ type: "sale", amount, description: description || "Token sale" });
  };

  return (
    <WalletContext.Provider value={{ balance, transactions, deposit, deduct, credit }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
};