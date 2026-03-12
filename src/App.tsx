import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { WalletProvider } from "@/contexts/WalletContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InvestorDashboard from "./pages/InvestorDashboard";
import Marketplace from "./pages/Marketplace";
import Transactions from "./pages/Transactions";
import PayoutsDashboard from "./pages/PayoutsDashboard";
import CompareBusinesses from "./pages/CompareBusinesses";
import InvestorRiskProfile from "./pages/InvestorRiskProfile";
import BusinessDashboard from "./pages/BusinessDashboard";
import BusinessTokens from "./pages/BusinessTokens";
import BusinessInvestors from "./pages/BusinessInvestors";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBusinesses from "./pages/AdminBusinesses";
import AdminUsers from "./pages/AdminUsers";
import CompanyProfile from "./pages/CompanyProfile";
import InvestorProfile from "./pages/InvestorProfile";
import BusinessProfile from "./pages/BusinessProfile";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CurrencyProvider>
      <WalletProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/investor" element={<InvestorDashboard />} />
            <Route path="/investor/marketplace" element={<Marketplace />} />
            <Route path="/investor/transactions" element={<Transactions />} />
            <Route path="/investor/payouts" element={<PayoutsDashboard />} />
            <Route path="/investor/compare" element={<CompareBusinesses />} />
            <Route path="/investor/risk-profile" element={<InvestorRiskProfile />} />
            <Route path="/investor/company/:slug" element={<CompanyProfile />} />
            <Route path="/business" element={<BusinessDashboard />} />
            <Route path="/business/tokens" element={<BusinessTokens />} />
            <Route path="/business/investors" element={<BusinessInvestors />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/businesses" element={<AdminBusinesses />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </WalletProvider>
    </CurrencyProvider>
  </QueryClientProvider>
);

export default App;
