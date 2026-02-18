import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InvestorDashboard from "./pages/InvestorDashboard";
import Marketplace from "./pages/Marketplace";
import Transactions from "./pages/Transactions";
import BusinessDashboard from "./pages/BusinessDashboard";
import BusinessTokens from "./pages/BusinessTokens";
import BusinessInvestors from "./pages/BusinessInvestors";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBusinesses from "./pages/AdminBusinesses";
import AdminUsers from "./pages/AdminUsers";
import CompanyProfile from "./pages/CompanyProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="/investor/company/:slug" element={<CompanyProfile />} />
          <Route path="/business" element={<BusinessDashboard />} />
          <Route path="/business/tokens" element={<BusinessTokens />} />
          <Route path="/business/investors" element={<BusinessInvestors />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/businesses" element={<AdminBusinesses />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
