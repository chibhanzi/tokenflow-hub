import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MobileDashboardLayout from "@/components/MobileDashboardLayout";
import { TrendingUp, Coins, ShieldCheck, CreditCard, GitCompare, Eye, ArrowUpRight } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useCurrency } from "@/contexts/CurrencyContext";

const navItems = [
  { to: "/dashboard/investor", label: "Portfolio", icon: TrendingUp },
  { to: "/marketplace", label: "Marketplace", icon: Coins },
  { to: "/transactions", label: "Transactions", icon: ShieldCheck },
  { to: "/compare", label: "Compare", icon: GitCompare },
  { to: "/payouts", label: "Payouts", icon: CreditCard },
];

const InvestorDashboard = () => {
  const { balance, transactions } = useWallet();
  const { format } = useCurrency();

  const recentTransactions = transactions.slice(0, 3);
  const totalInvested = transactions
    .filter(tx => tx.type === 'purchase')
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  return (
    <MobileDashboardLayout title="Portfolio" navItems={navItems}>
      <div className="space-y-6 pb-24">
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-navy to-navy-dark text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/70 text-sm">Total Balance</p>
                <p className="text-3xl font-bold">{format(balance)}</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-white" asChild>
                <Link to="/marketplace">Invest More</Link>
              </Button>
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link to="/transactions">View All</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Coins size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Invested</p>
                  <p className="font-semibold">{format(totalInvested)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <ArrowUpRight size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Active Tokens</p>
                  <p className="font-semibold">{transactions.filter(tx => tx.type === 'purchase').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/transactions">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentTransactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No transactions yet</p>
                <Button className="mt-3" size="sm" asChild>
                  <Link to="/marketplace">Start Investing</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.amount > 0 ? 'bg-green-500/10' : 'bg-red-500/10'
                      }`}>
                        {tx.amount > 0 ? (
                          <ArrowUpRight size={14} className="text-green-600" />
                        ) : (
                          <Eye size={14} className="text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{tx.date.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className={`font-semibold text-sm ${
                      tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tx.amount > 0 ? '+' : ''}{format(Math.abs(tx.amount))}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-16 bg-accent hover:bg-accent/90 text-white font-semibold" asChild>
            <Link to="/marketplace">
              <div className="text-center">
                <Coins size={24} className="mx-auto mb-1" />
                <span className="text-sm">Browse Tokens</span>
              </div>
            </Link>
          </Button>
          <Button variant="outline" className="h-16" asChild>
            <Link to="/kyc">
              <div className="text-center">
                <ShieldCheck size={24} className="mx-auto mb-1" />
                <span className="text-sm">Complete KYC</span>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </MobileDashboardLayout>
  );
};

export default InvestorDashboard;