import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Zap, TrendingUp, Crown, ArrowRight, Shield, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const tiers = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    description: "Perfect for businesses just starting their tokenisation journey",
    icon: Zap,
    features: [
      "1 token listing",
      "Basic analytics dashboard",
      "Email support",
      "Standard compliance tools",
      "Community access",
    ],
    cta: "Get Started",
    accent: "from-sky-500 to-blue-600",
    badge: null,
  },
  {
    id: "growth",
    name: "Growth",
    price: 99,
    description: "For growing businesses ready to scale their token offerings",
    icon: TrendingUp,
    features: [
      "5 token listings",
      "Advanced analytics & reports",
      "Priority support",
      "Investor insights & demographics",
      "Custom token branding",
      "API access",
    ],
    cta: "Start Growing",
    accent: "from-accent to-sky-400",
    badge: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 249,
    description: "Full-scale tokenisation with dedicated support and premium tools",
    icon: Crown,
    features: [
      "Unlimited token listings",
      "Custom analytics & dashboards",
      "Dedicated account manager",
      "Full API access",
      "White-label options",
      "Advanced compliance suite",
      "Priority token review",
    ],
    cta: "Contact Sales",
    accent: "from-violet-500 to-purple-600",
    badge: null,
  },
];

const paymentMethods = [
  { name: "EcoCash", icon: Smartphone },
  { name: "OneMoney", icon: Smartphone },
  { name: "InnBucks", icon: CreditCard },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 gradient-hero text-white">
        <div className="container px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="border-white/20 text-white/80 mb-4">
              Simple, transparent pricing
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Choose Your Plan
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Unlock the full power of DePeer's tokenisation platform. All plans include
              access to our marketplace and secure payment processing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-16 -mt-8">
        <div className="container px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl border bg-card p-6 flex flex-col ${
                  tier.badge ? "border-accent shadow-lg shadow-accent/10 ring-1 ring-accent/20" : "border-border"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground font-semibold px-3">
                      {tier.badge}
                    </Badge>
                  </div>
                )}

                <div className="mb-5">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${tier.accent} text-white mb-3`}>
                    <tier.icon size={20} />
                  </div>
                  <h3 className="font-display text-xl font-bold">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
                </div>

                <div className="mb-6">
                  <span className="font-display text-4xl font-bold">${tier.price}</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-accent shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full font-semibold ${
                    tier.badge
                      ? "bg-accent hover:bg-accent/90 text-white"
                      : "bg-secondary hover:bg-secondary/80 text-foreground"
                  }`}
                  asChild
                >
                  <Link to="/register">
                    {tier.cta}
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee info */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Transparent Fee Structure
            </h2>
            <p className="text-muted-foreground">No hidden fees — know exactly what you're paying</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border bg-card p-6 text-center"
            >
              <div className="font-display text-3xl font-bold text-accent mb-1">2.5%</div>
              <div className="font-semibold mb-1">Transaction Fee</div>
              <p className="text-xs text-muted-foreground">Applied on every token buy/sell transaction</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border bg-card p-6 text-center"
            >
              <div className="font-display text-3xl font-bold text-accent mb-1">$50</div>
              <div className="font-semibold mb-1">Listing Fee</div>
              <p className="text-xs text-muted-foreground">One-time fee when issuing a new token</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border bg-card p-6 text-center"
            >
              <div className="inline-flex items-center gap-1.5 mb-1">
                <Shield size={18} className="text-accent" />
                <span className="font-semibold">Secure Payments</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">All payments processed securely via Paynow</p>
            </motion.div>
          </div>

          {/* Accepted payment methods */}
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-4">Accepted payment methods</p>
            <div className="flex justify-center gap-4 flex-wrap">
              {paymentMethods.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-card text-sm font-medium"
                >
                  <m.icon size={16} className="text-accent" />
                  {m.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
