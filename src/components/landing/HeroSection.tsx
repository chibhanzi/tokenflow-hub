import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Globe } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import depeerLogo from "@/assets/depeer-logo.png";

const stats = [
  { label: "Businesses Tokenised", value: "120+" },
  { label: "Tokens Issued", value: "$4.2M" },
  { label: "Active Investors", value: "3,800+" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,35%,8%)]/95 via-[hsl(220,35%,8%)]/80 to-[hsl(220,35%,8%)]/50" />

      {/* Large faint logo embedded in the background */}
      <img
        src={depeerLogo}
        alt=""
        className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] opacity-[0.12] brightness-0 invert pointer-events-none select-none object-contain"
      />

      <div className="container relative z-10 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl">

          <motion.h1
            className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Invest in Africa's{" "}
            <span className="text-accent">Next Generation</span>{" "}
            of Businesses
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-white/70 max-w-xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            DePeer tokenises African SMEs — letting investors buy revenue, asset, and equity tokens on the TON blockchain. Transparent, secure, and accessible.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold text-base px-8" asChild>
              <Link to="/register">
                Start Investing <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button size="lg" className="border border-white/30 bg-transparent text-white hover:bg-white/10 font-semibold text-base px-8" asChild>
              <Link to="/register">List Your Business</Link>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-6 sm:gap-8 lg:gap-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
                <div className="text-xs sm:text-sm text-white/50">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
