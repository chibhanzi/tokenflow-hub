import { motion } from "framer-motion";
import { TrendingUp, Building, PieChart } from "lucide-react";

const types = [
  {
    icon: TrendingUp,
    title: "Revenue Tokens",
    desc: "Earn a share of a business's monthly revenue. Predictable returns tied to real performance.",
  },
  {
    icon: Building,
    title: "Asset Tokens",
    desc: "Backed by physical or intellectual assets. Stable value with tangible collateral.",
  },
  {
    icon: PieChart,
    title: "Equity Tokens",
    desc: "Own a stake in the business itself. Participate in growth and long-term value creation.",
  },
];

const TokenTypesSection = () => {
  return (
    <section id="token-types" className="py-16 sm:py-24 gradient-hero">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
            Three Ways to <span className="text-accent">Invest</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm sm:text-base">
            Choose from revenue, asset, or equity tokens — each backed by real African businesses.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {types.map((t, i) => (
            <motion.div
              key={t.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-center hover:bg-white/[0.08] transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <t.icon size={26} className="text-accent" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-semibold mb-3 text-white">{t.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TokenTypesSection;
