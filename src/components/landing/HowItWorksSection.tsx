import { motion } from "framer-motion";
import { UserPlus, Search, ShoppingCart, TrendingUp } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create Account", desc: "Sign up as an investor or register your business in minutes." },
  { icon: Search, title: "Explore Tokens", desc: "Browse verified African SMEs and their tokenised offerings." },
  { icon: ShoppingCart, title: "Invest", desc: "Deposit funds via EcoCash, Visa, or bank transfer and buy tokens." },
  { icon: TrendingUp, title: "Earn Returns", desc: "Receive payouts tied to revenue, assets, or equity growth." },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-16 sm:py-24 bg-muted/30">
    <div className="container px-4 sm:px-6">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          How It <span className="text-accent">Works</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          Four simple steps to start investing in Africa's tokenised economy.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            className="relative text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="w-14 h-14 rounded-2xl gradient-navy flex items-center justify-center mx-auto mb-4">
              <s.icon size={24} className="text-primary-foreground" />
            </div>
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 rounded-full w-6 h-6 flex items-center justify-center">
              {i + 1}
            </span>
            <h3 className="font-display text-base font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
