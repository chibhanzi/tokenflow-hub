import { Coins, BarChart3, ShieldCheck, Wallet, Building2, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Coins,
    title: "Token Marketplace",
    desc: "Browse and purchase revenue, asset, and equity tokens from verified African SMEs.",
    gradient: "from-sky-500/20 to-blue-600/20",
    iconBg: "bg-sky-500/15 text-sky-400",
    stat: "200+",
    statLabel: "Listed Tokens",
  },
  {
    icon: BarChart3,
    title: "Portfolio Tracking",
    desc: "Real-time dashboards showing your token holdings, payouts, and ROI performance.",
    gradient: "from-emerald-500/20 to-teal-600/20",
    iconBg: "bg-emerald-500/15 text-emerald-400",
    stat: "24/7",
    statLabel: "Live Analytics",
  },
  {
    icon: ShieldCheck,
    title: "Blockchain Secured",
    desc: "All tokens are minted on the TON blockchain with full transparency and auditability.",
    gradient: "from-violet-500/20 to-purple-600/20",
    iconBg: "bg-violet-500/15 text-violet-400",
    stat: "100%",
    statLabel: "On-Chain",
  },
  {
    icon: Wallet,
    title: "RenexPay Integration",
    desc: "Seamless payments with RenexPay for fast, secure token purchases across Africa.",
    gradient: "from-amber-500/20 to-orange-600/20",
    iconBg: "bg-amber-500/15 text-amber-400",
    stat: "6+",
    statLabel: "Payment Methods",
  },
  {
    icon: Building2,
    title: "Business Tokenisation",
    desc: "SMEs can issue tokens backed by revenue streams, physical assets, or equity stakes.",
    gradient: "from-rose-500/20 to-pink-600/20",
    iconBg: "bg-rose-500/15 text-rose-400",
    stat: "3",
    statLabel: "Token Types",
  },
  {
    icon: Users,
    title: "Investor Management",
    desc: "Businesses track their investors, manage payouts, and maintain compliance effortlessly.",
    gradient: "from-cyan-500/20 to-blue-600/20",
    iconBg: "bg-cyan-500/15 text-cyan-400",
    stat: "Auto",
    statLabel: "Payout Engine",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 sm:px-6 relative">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-accent/10 text-accent mb-4">
            Platform Features
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="relative">
              <span className="text-accent">Invest & Grow</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M2 6C50 2 150 2 198 6" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              </svg>
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            A complete platform for investors and businesses to participate in Africa's tokenised economy.
          </p>
        </motion.div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className={`group relative rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 ${
                i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className={`relative p-5 sm:p-6 flex flex-col ${i === 0 ? "lg:min-h-[320px] lg:justify-between" : ""}`}>
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${f.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <f.icon size={20} />
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-muted-foreground/40 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 mt-1"
                    />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>

                {/* Stat badge */}
                <div className="mt-5 pt-4 border-t border-border/40 flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-display font-bold text-accent">{f.stat}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{f.statLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
