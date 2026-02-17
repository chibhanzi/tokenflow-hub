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
      <div className="absolute inset-0 gradient-hero opacity-90" />

      <div className="container relative z-10 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent font-medium mb-6">
              <Globe size={14} /> Powering African SME Growth
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-secondary-foreground">Invest in Africa's</span>
            <br />
            <span className="text-gradient-navy">Next Generation</span>
            <br />
            <span className="text-secondary-foreground">of Businesses</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-secondary-foreground/60 max-w-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            DePeer tokenises African SMEs, letting investors buy revenue, asset, and equity tokens on the TON blockchain. Transparent, secure, and accessible.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button size="lg" className="gradient-navy text-primary-foreground font-semibold text-base px-8 glow-navy" asChild>
              <Link to="/register">
                Start Investing <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/5" asChild>
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
                <div className="font-display text-2xl sm:text-3xl font-bold text-accent">{s.value}</div>
                <div className="text-xs sm:text-sm text-secondary-foreground/50">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { icon: Shield, label: "Blockchain\nSecured" },
            { icon: TrendingUp, label: "Real\nReturns" },
            { icon: Globe, label: "Pan-African\nAccess" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="glass-card rounded-xl p-4 text-center w-28">
              <Icon size={24} className="text-accent mx-auto mb-2" />
              <div className="text-xs text-secondary-foreground/70 whitespace-pre-line">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
