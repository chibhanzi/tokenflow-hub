import { Link } from "react-router-dom";
import depeerLogo from "@/assets/depeer-logo.png";

const Footer = () => (
  <footer className="bg-[hsl(220,35%,10%)] border-t border-white/10 py-10 sm:py-12">
    <div className="container px-4 sm:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <Link to="/"><img src={depeerLogo} alt="DePeer" className="h-8 mx-auto md:mx-0 brightness-0 invert" /></Link>
          <p className="text-sm text-white/50 mt-1">Tokenising Africa's Future</p>
        </div>
        <div className="flex gap-6 text-sm text-white/50">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#token-types" className="hover:text-white transition-colors">Tokens</a>
          <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
          <Link to="/register" className="hover:text-white transition-colors">Sign Up</Link>
        </div>
        <p className="text-xs text-white/30">© 2026 DePeer. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
