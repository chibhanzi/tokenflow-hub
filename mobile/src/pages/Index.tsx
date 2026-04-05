import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, TrendingUp, Shield, Users, Coins, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import depeerLogo from "../assets/depeer-logo.png";

const stats = [
  { label: "Businesses", value: "120+", icon: Users },
  { label: "Tokens", value: "$4.2M", icon: Coins },
  { label: "Investors", value: "3,800+", icon: TrendingUp },
];

const features = [
  {
    icon: Coins,
    title: "Token Marketplace",
    desc: "Browse 200+ investment opportunities",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    icon: TrendingUp,
    title: "Live Analytics",
    desc: "Track your portfolio 24/7",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Shield,
    title: "Blockchain Security",
    desc: "100% on-chain transparency",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-dark to-navy-light overflow-hidden pb-24">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 left-10 w-52 h-52 bg-sky-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Mobile Header with Logo */}
      <header className="relative z-20 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={depeerLogo}
              alt="DePeer"
              className="w-8 h-8 object-contain"
            />
            <span className="text-white font-bold text-lg">DePeer</span>
          </div>
          <div className="text-accent text-sm font-medium">
            Africa's #1 SME Platform
          </div>
        </div>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent mb-6 text-sm">
              <Zap size={14} />
              <span className="font-semibold">Tokenize Real Business Value</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-6 text-white">
              Invest in Africa's{" "}
              <span className="text-accent">Next Gen</span> Businesses
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed px-2">
              Own a piece of vetted African SMEs through tokenised securities. Revenue, asset, and equity tokens all on blockchain.
            </p>

            {/* Mobile-First CTA Buttons */}
            <div className="flex flex-col gap-3 mb-8 px-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold text-base px-6 h-14 rounded-xl shadow-lg" asChild>
                <Link to="/register" className="flex items-center justify-center gap-2">
                  Start Investing <ArrowRight size={18} />
                </Link>
              </Button>
              <Button size="lg" className="border-2 border-white/30 bg-transparent text-white hover:bg-white/10 font-semibold text-base px-6 h-14 rounded-xl" asChild>
                <Link to="/marketplace" className="flex items-center justify-center">
                  Browse Opportunities
                </Link>
              </Button>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center mb-4"
            >
              <ChevronDown className="text-white/50" size={24} />
            </motion.div>
          </motion.div>

          {/* Stats Section - Mobile Optimized */}
          <motion.div
            className="grid grid-cols-3 gap-3 mb-8 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <Icon className="text-accent mx-auto mb-2" size={20} />
                  <div className="font-display text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/50 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why DePeer Section - Mobile Optimized */}
      <section className="relative z-10 px-4 py-8 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-2xl font-bold text-white mb-2">Why Choose DePeer?</h2>
            <p className="text-white/70 text-sm">Everything you need to invest confidently</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-accent/30 transition-all"
                >
                  <div className={`${feat.bg} ${feat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-white/70">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Mobile Optimized */}
      <section className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-2xl font-bold text-white mb-2">Get Started in 3 Steps</h2>
          </motion.div>

          <div className="space-y-3">
            {[
              { step: "1", title: "Register", desc: "Create your account in seconds" },
              { step: "2", title: "Browse & Select", desc: "Explore 200+ investment opportunities" },
              { step: "3", title: "Invest & Earn", desc: "Own tokens and receive revenue payouts" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-accent/30 transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-white font-display font-bold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-white/70 mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="relative z-10 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-2xl p-6 text-center"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Ready to Start Investing?
          </h2>
          <p className="text-white/70 mb-6 text-sm">
            Join thousands of African investors building wealth through tokenised SMEs.
          </p>
          <div className="flex flex-col gap-3">
            <Button size="lg" className="bg-white text-navy hover:bg-gray-100 font-semibold px-6 h-12 rounded-xl" asChild>
              <Link to="/register" className="flex items-center justify-center">Get Started Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-6 h-12 rounded-xl" asChild>
              <Link to="/marketplace" className="flex items-center justify-center">Browse First</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;