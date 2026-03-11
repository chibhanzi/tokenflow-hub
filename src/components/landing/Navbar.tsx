import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import depeerLogo from "@/assets/depeer-logo.png";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleAnchor = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[hsl(220,35%,10%,0.9)] backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/">
          <img src={depeerLogo} alt="DePeer" className="h-9 sm:h-10 brightness-0 invert" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("features")} className="text-sm text-white/70 hover:text-white transition-colors">Features</button>
          <button onClick={() => scrollTo("how-it-works")} className="text-sm text-white/70 hover:text-white transition-colors">How It Works</button>
          <button onClick={() => scrollTo("token-types")} className="text-sm text-white/70 hover:text-white transition-colors">Tokens</button>
          <Link to="/pricing" className="text-sm text-white/70 hover:text-white transition-colors">Pricing</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button className="bg-accent hover:bg-accent/90 text-white font-semibold" asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[hsl(220,35%,10%)] border-t border-white/10 p-4 space-y-3">
          <button onClick={() => handleAnchor("features")} className="block text-sm text-white/70 py-2 w-full text-left">Features</button>
          <button onClick={() => handleAnchor("how-it-works")} className="block text-sm text-white/70 py-2 w-full text-left">How It Works</button>
          <button onClick={() => handleAnchor("token-types")} className="block text-sm text-white/70 py-2 w-full text-left">Tokens</button>
          <Link to="/pricing" className="block text-sm text-white/70 py-2" onClick={() => setOpen(false)}>Pricing</Link>
          <div className="flex flex-col gap-2 pt-2">
            <Button variant="ghost" size="sm" className="justify-start text-white/80 hover:text-white hover:bg-white/10" asChild><Link to="/login">Sign In</Link></Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-white" asChild><Link to="/register">Get Started</Link></Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
