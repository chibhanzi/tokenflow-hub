import { motion } from "framer-motion";
import { TrendingUp, Building, PieChart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const types = [
  {
    icon: TrendingUp,
    title: "Revenue Tokens",
    tag: "Yield-based",
    desc: "Earn a share of a business's monthly revenue. Predictable returns tied to real performance.",
    highlights: ["Monthly payouts", "Performance-linked", "Lower risk"],
    color: "from-sky-500/20 to-sky-600/5",
    borderColor: "border-sky-500/20",
    iconBg: "bg-sky-500/15",
    iconColor: "text-sky-400",
  },
  {
    icon: Building,
    title: "Asset Tokens",
    tag: "Collateralised",
    desc: "Backed by physical or intellectual assets. Stable value with tangible collateral.",
    highlights: ["Asset-backed", "Stable value", "Tangible security"],
    color: "from-emerald-500/20 to-emerald-600/5",
    borderColor: "border-emerald-500/20",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
  {
    icon: PieChart,
    title: "Equity Tokens",
    tag: "Growth-focused",
    desc: "Own a stake in the business itself. Participate in growth and long-term value creation.",
    highlights: ["Ownership stake", "Capital appreciation", "Voting rights"],
    color: "from-violet-500/20 to-violet-600/5",
    borderColor: "border-violet-500/20",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
  },
];

const TokenTypesSection = () => {
  return (
    <section id="token-types" className="py-20 sm:py-28 gradient-hero relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container px-4 sm:px-6 relative z-10">
        <div className="text-center mb-14 sm:mb-20">
          <motion.span
            className="inline-block text-accent text-xs font-semibold tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Investment Options
          </motion.span>
          <motion.h2
            className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold mb-5 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            Three Ways to <span className="text-accent">Invest</span>
          </motion.h2>
          <motion.p
            className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Choose from revenue, asset, or equity tokens — each backed by real African businesses with on-chain transparency.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {types.map((t, i) => (
            <motion.div
              key={t.title}
              className={`group relative rounded-2xl border ${t.borderColor} bg-gradient-to-b ${t.color} p-6 sm:p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {/* Tag */}
              <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-wide uppercase text-white/40 mb-5">
                {t.tag}
              </span>

              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${t.iconBg} flex items-center justify-center mb-5 sm:mb-6`}>
                <t.icon size={26} className={t.iconColor} />
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 text-white">{t.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{t.desc}</p>

              {/* Highlights */}
              <ul className="space-y-2 mb-6">
                {t.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-white/60">
                    <span className={`w-1.5 h-1.5 rounded-full ${t.iconBg} ${t.iconColor}`} />
                    {h}
                  </li>
                ))}
              </ul>

              <Link
                to="/marketplace"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors group-hover:gap-2.5"
              >
                Explore tokens <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TokenTypesSection;
