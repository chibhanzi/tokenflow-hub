import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import VideoSection from "@/components/landing/VideoSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TokenTypesSection from "@/components/landing/TokenTypesSection";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen scroll-smooth">
    <Navbar />
    <HeroSection />
    <VideoSection />
    <FeaturesSection />
    <HowItWorksSection />
    <TokenTypesSection />
    <Footer />
  </div>
);

export default Index;
