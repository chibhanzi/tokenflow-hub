import { motion } from "framer-motion";
import { TrendingUp, Building, PieChart } from "lucide-react";

const types = [
  {
    icon: TrendingUp,
    title: "Revenue Tokens",
    desc: "Earn a share of a business's monthly revenue. Predictable returns tied to real performance.",
    color: "from-primary to-navy-light",
  },
  {
    icon: Building,
    title: "Asset Tokens",
    desc: "Backed by physical or intellectual assets. Stable value with tangible collateral.",
    color: "from-accent to-sky-light",
  },
  {
    icon: PieChart,
    title: "Equity Tokens",
    desc: "Own a stake in the business itself. Participate in growth and long-term value creation.",
    color: "from-blue-500 to-indigo-500",
  },
];

const TokenTypesSection = () => {
  return (
    <section id="token-types" className="py-16 sm:py-24 bg-secondary text-secondary-foreground">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Three Ways to <span className="text-gradient-navy">Invest</span>
          </h2>
          <p className="text-secondary-foreground/60 max-w-xl mx-auto text-sm sm:text-base">
            Choose from revenue, asset, or equity tokens — each backed by real African businesses.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {types.map((t, i) => (
            <motion.div
              key={t.title}
              className="glass-card rounded-2xl p-6 sm:p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center mx-auto mb-5 sm:mb-6`}>
                <t.icon size={26} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-semibold mb-3">{t.title}</h3>
              <p className="text-secondary-foreground/60 text-sm leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TokenTypesSection;
