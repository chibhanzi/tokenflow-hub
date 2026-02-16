import { Link } from "react-router-dom";
import depeerLogo from "@/assets/depeer-logo.png";

const Footer = () => (
  <footer className="bg-secondary border-t border-border/30 py-12">
    <div className="container">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <Link to="/"><img src={depeerLogo} alt="DePeer" className="h-7" /></Link>
          <p className="text-sm text-secondary-foreground/50 mt-1">Tokenising Africa's Future</p>
        </div>
        <div className="flex gap-6 text-sm text-secondary-foreground/50">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#token-types" className="hover:text-primary transition-colors">Tokens</a>
          <Link to="/login" className="hover:text-primary transition-colors">Sign In</Link>
        </div>
        <p className="text-xs text-secondary-foreground/30">© 2026 Depeer. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
