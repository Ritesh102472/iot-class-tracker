import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wifi, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card backdrop-blur-glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow transition-transform group-hover:scale-110">
              <Wifi className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-heading bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">SmartAttend</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-all duration-300 font-body relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
              Home
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="hover:text-primary transition-all duration-300">
              <Link to="/auth">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-primary hover:shadow-glow transition-all duration-500 font-body">
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
