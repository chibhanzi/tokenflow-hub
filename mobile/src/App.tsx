import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import FloatingBottomNav from '@/components/FloatingBottomNav'
import { SplashScreen } from '@/components/SplashScreen'
import { CurrencyProvider } from '@/contexts/CurrencyContext'
import { KycProvider } from '@/contexts/KycContext'
import { WalletProvider } from '@/contexts/WalletContext'
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Marketplace from '@/pages/Marketplace'
import Compare from '@/pages/Compare'
import InvestorDashboard from '@/pages/InvestorDashboard'
import BusinessDashboard from '@/pages/BusinessDashboard'
import AdminDashboard from '@/pages/AdminDashboard'
import KycVerification from '@/pages/KycVerification'
import Transactions from '@/pages/Transactions'
import NotFound from '@/pages/NotFound'

const queryClient = new QueryClient()

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <KycProvider>
          <WalletProvider>
            <Router>
              <div className="min-h-screen bg-background">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/dashboard/investor" element={<InvestorDashboard />} />
                  <Route path="/dashboard/business" element={<BusinessDashboard />} />
                  <Route path="/dashboard/admin" element={<AdminDashboard />} />
                  <Route path="/kyc" element={<KycVerification />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <FloatingBottomNav />
                <Toaster />
              </div>
            </Router>
          </WalletProvider>
        </KycProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  )
}

export default App