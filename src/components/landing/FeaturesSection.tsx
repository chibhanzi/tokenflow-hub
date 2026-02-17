import { Coins, BarChart3, ShieldCheck, Wallet, Building2, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Coins, title: "Token Marketplace", desc: "Browse and purchase revenue, asset, and equity tokens from verified African SMEs." },
  { icon: BarChart3, title: "Portfolio Tracking", desc: "Real-time dashboards showing your token holdings, payouts, and ROI performance." },
  { icon: ShieldCheck, title: "Blockchain Secured", desc: "All tokens are minted on the TON blockchain with full transparency and auditability." },
  { icon: Wallet, title: "RenexPay Integration", desc: "Seamless payments with RenexPay for fast, secure token purchases across Africa." },
  { icon: Building2, title: "Business Tokenisation", desc: "SMEs can issue tokens backed by revenue streams, physical assets, or equity stakes." },
  { icon: Users, title: "Investor Management", desc: "Businesses track their investors, manage payouts, and maintain compliance effortlessly." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 sm:py-24 bg-background">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Everything You Need to <span className="text-gradient-navy">Invest & Grow</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            A complete platform for investors and businesses to participate in Africa's tokenised economy.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-5 sm:p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg gradient-navy flex items-center justify-center mb-4">
                <f.icon size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-base sm:text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
