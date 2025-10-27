import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wifi, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card backdrop-blur-glass border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-neon-teal transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
              <Wifi className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-black gradient-text">SmartAttend</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-10">
            <Link to="/" className="text-foreground hover:text-primary transition-all duration-300 font-medium text-base relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-primary after:transition-all after:duration-300 hover:after:w-full">
              Home
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="hover:text-primary hover:glass-card transition-all duration-300 font-semibold">
              <Link to="/auth">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-primary hover:scale-105 shadow-neon-teal hover:shadow-neon-purple transition-all duration-500 font-bold px-6">
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
