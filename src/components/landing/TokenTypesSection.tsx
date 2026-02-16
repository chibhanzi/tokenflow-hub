import { motion } from "framer-motion";
import { TrendingUp, Building, PieChart } from "lucide-react";

const types = [
  {
    icon: TrendingUp,
    title: "Revenue Tokens",
    desc: "Earn a share of a business's monthly revenue. Predictable returns tied to real performance.",
    color: "from-primary to-gold-light",
  },
  {
    icon: Building,
    title: "Asset Tokens",
    desc: "Backed by physical or intellectual assets. Stable value with tangible collateral.",
    color: "from-accent to-emerald-400",
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
    <section id="token-types" className="py-24 bg-secondary text-secondary-foreground">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Three Ways to <span className="text-gradient-gold">Invest</span>
          </h2>
          <p className="text-secondary-foreground/60 max-w-xl mx-auto">
            Choose from revenue, asset, or equity tokens — each backed by real African businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {types.map((t, i) => (
            <motion.div
              key={t.title}
              className="glass-card rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center mx-auto mb-6`}>
                <t.icon size={28} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{t.title}</h3>
              <p className="text-secondary-foreground/60 text-sm leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TokenTypesSection;
