import { useWallet } from "@/contexts/WalletContext";
import { useCurrency } from "@/contexts/CurrencyContext";

const Transactions = () => {
  const { transactions } = useWallet();
  const { format } = useCurrency();

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-display font-bold text-navy mb-6">Transactions</h1>

        <div className="bg-white rounded-lg shadow-sm border">
          {transactions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No transactions yet
            </div>
          ) : (
            <div className="divide-y">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-navy">{tx.description}</p>
                    <p className="text-sm text-gray-500">{tx.date.toLocaleDateString()}</p>
                  </div>
                  <p className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.amount > 0 ? '+' : ''}{format(Math.abs(tx.amount))}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;