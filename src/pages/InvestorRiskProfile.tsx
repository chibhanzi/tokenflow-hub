import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart3, Coins, History, Shield, ChevronRight, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/investor", label: "Portfolio", icon: BarChart3 },
  { to: "/investor/marketplace", label: "Marketplace", icon: Coins },
  { to: "/investor/transactions", label: "Transactions", icon: History },
];

const questions = [
  {
    q: "What is your primary investment goal?",
    options: [
      { label: "Preserve capital with steady returns", score: 1 },
      { label: "Balanced growth and income", score: 2 },
      { label: "Maximize long-term growth", score: 3 },
      { label: "Aggressive growth, high risk tolerance", score: 4 },
    ],
  },
  {
    q: "How long do you plan to hold your token investments?",
    options: [
      { label: "Less than 6 months", score: 1 },
      { label: "6 months to 1 year", score: 2 },
      { label: "1-3 years", score: 3 },
      { label: "3+ years", score: 4 },
    ],
  },
  {
    q: "If your portfolio dropped 20% in a month, you would:",
    options: [
      { label: "Sell everything immediately", score: 1 },
      { label: "Sell some to reduce exposure", score: 2 },
      { label: "Hold and wait for recovery", score: 3 },
      { label: "Buy more at lower prices", score: 4 },
    ],
  },
  {
    q: "What percentage of your total savings are you investing?",
    options: [
      { label: "Less than 10%", score: 1 },
      { label: "10-25%", score: 2 },
      { label: "25-50%", score: 3 },
      { label: "More than 50%", score: 4 },
    ],
  },
  {
    q: "How experienced are you with alternative investments (tokens, crypto, private equity)?",
    options: [
      { label: "No experience", score: 1 },
      { label: "Some basic knowledge", score: 2 },
      { label: "Moderate experience", score: 3 },
      { label: "Very experienced", score: 4 },
    ],
  },
];

const profiles = [
  { name: "Conservative", min: 5, max: 8, color: "text-success", bg: "bg-success/10", desc: "Low-risk tokens like Cape Solar (Asset) and Nala Logistics (Revenue) with steady payouts.", recs: ["Revenue tokens", "Asset-backed tokens", "Low risk scores (1-3)"] },
  { name: "Moderate", min: 9, max: 13, color: "text-warning", bg: "bg-warning/10", desc: "Balanced mix of revenue shares and growth equity. Diversify across sectors.", recs: ["Mix of Revenue & Asset tokens", "Medium risk scores (3-5)", "Diversified sectors"] },
  { name: "Growth", min: 14, max: 17, color: "text-accent", bg: "bg-accent/10", desc: "Growth-focused equity tokens in high-momentum sectors like fintech and tech.", recs: ["Equity tokens", "High-growth companies", "Technology & Fintech sectors"] },
  { name: "Aggressive", min: 18, max: 20, color: "text-destructive", bg: "bg-destructive/10", desc: "Maximum exposure to high-growth equity with significant upside potential.", recs: ["Equity tokens exclusively", "Highest growth companies", "Concentrated positions"] },
];

const InvestorRiskProfile = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setCompleted(true);
    }
  };

  const totalScore = answers.reduce((s, a) => s + a, 0);
  const profile = profiles.find(p => totalScore >= p.min && totalScore <= p.max) || profiles[1];
  const progress = ((current + (completed ? 1 : 0)) / questions.length) * 100;

  const reset = () => { setCurrent(0); setAnswers([]); setCompleted(false); };

  return (
    <DashboardLayout title="Investor Dashboard" navItems={navItems}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <Shield size={40} className="mx-auto text-primary mb-3" />
          <h1 className="font-display text-2xl font-bold">Investor Risk Profile</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {completed ? "Your personalized investment profile" : "Answer a few questions to get tailored recommendations"}
          </p>
        </div>

        <Progress value={progress} className="mb-8 h-2" />

        {!completed ? (
          <Card>
            <CardHeader>
              <div className="text-xs text-muted-foreground mb-1">Question {current + 1} of {questions.length}</div>
              <CardTitle className="text-lg font-display">{questions[current].q}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {questions[current].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.score)}
                  className="w-full text-left p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/50 transition-all flex items-center justify-between group"
                >
                  <span className="text-sm font-medium">{opt.label}</span>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              ))}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className={cn("border-2", profile.color === "text-success" && "border-success/30", profile.color === "text-warning" && "border-warning/30", profile.color === "text-accent" && "border-accent/30", profile.color === "text-destructive" && "border-destructive/30")}>
              <CardContent className="p-6 text-center">
                <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4", profile.bg, profile.color)}>
                  <Shield size={16} /> {profile.name} Investor
                </div>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">{profile.desc}</p>
                <div className="text-xs text-muted-foreground mt-3">Score: {totalScore}/{questions.length * 4}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">Recommended Token Strategy</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {profile.recs.map((r, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-success shrink-0" /> {r}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={reset}>Retake Assessment</Button>
              <Button className="flex-1" onClick={() => navigate("/investor/marketplace")}>Browse Marketplace</Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InvestorRiskProfile;
