import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet } from "lucide-react";
import depeerLogo from "@/assets/depeer-logo.png";

const roles = [
  { value: "investor", label: "Investor", desc: "Browse and invest in tokens" },
  { value: "business", label: "Business", desc: "Tokenise your business" },
];

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("investor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/"><img src={depeerLogo} alt="DePeer" className="h-10 mx-auto" /></Link>
          <p className="text-muted-foreground mt-2 text-sm">Create your account</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {roles.map((r) => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`rounded-xl p-3 sm:p-4 text-left transition-all border ${
                  role === r.value
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <div className={`font-display font-semibold text-sm ${role === r.value ? "text-accent" : "text-foreground"}`}>
                  {r.label}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
              </button>
            ))}
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 bg-muted/50 border-input text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 bg-muted/50 border-input text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Create Account
            </Button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground">or</span></div>
          </div>

          <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
            <Wallet size={18} className="mr-2" /> Connect TON Wallet
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-accent font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
