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
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/"><img src={depeerLogo} alt="DePeer" className="h-10 mx-auto" /></Link>
          <p className="text-secondary-foreground/50 mt-2">Create your account</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {roles.map((r) => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`rounded-xl p-4 text-left transition-all border ${
                  role === r.value
                    ? "border-primary bg-primary/10"
                    : "border-secondary-foreground/10 hover:border-secondary-foreground/20"
                }`}
              >
                <div className={`font-display font-semibold text-sm ${role === r.value ? "text-primary" : "text-secondary-foreground/80"}`}>
                  {r.label}
                </div>
                <div className="text-xs text-secondary-foreground/40 mt-0.5">{r.desc}</div>
              </button>
            ))}
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-secondary-foreground/80">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 bg-secondary-foreground/5 border-secondary-foreground/10 text-secondary-foreground placeholder:text-secondary-foreground/30"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-secondary-foreground/80">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 bg-secondary-foreground/5 border-secondary-foreground/10 text-secondary-foreground placeholder:text-secondary-foreground/30"
              />
            </div>
            <Button type="submit" className="w-full gradient-gold text-primary-foreground font-semibold">
              Create Account
            </Button>
          </form>

          <div className="mt-4">
            <Button variant="outline" className="w-full border-secondary-foreground/10 text-secondary-foreground/70 hover:bg-secondary-foreground/5">
              <Wallet size={18} className="mr-2" /> Connect TON Wallet
            </Button>
          </div>

          <p className="text-center text-sm text-secondary-foreground/40 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
