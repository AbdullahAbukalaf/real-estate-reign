
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-real-navy">Estate<span className="text-real-gold">Hub</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-real-gold transition-colors">Home</Link>
          <Link to="/properties" className="text-foreground hover:text-real-gold transition-colors">Properties</Link>
          <Link to="/agents" className="text-foreground hover:text-real-gold transition-colors">Agents</Link>
          <Link to="/contact" className="text-foreground hover:text-real-gold transition-colors">Contact</Link>
          <Button asChild variant="outline" className="ml-2">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Register</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isMenuOpen ? "hidden" : "block"}>
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isMenuOpen ? "block" : "hidden"}>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} border-t`}>
        <div className="container flex flex-col space-y-4 py-4 px-4">
          <Link to="/" className="text-foreground hover:text-real-gold transition-colors py-2">Home</Link>
          <Link to="/properties" className="text-foreground hover:text-real-gold transition-colors py-2">Properties</Link>
          <Link to="/agents" className="text-foreground hover:text-real-gold transition-colors py-2">Agents</Link>
          <Link to="/contact" className="text-foreground hover:text-real-gold transition-colors py-2">Contact</Link>
          <hr className="my-2" />
          <Button asChild variant="outline" className="w-full">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild className="w-full">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
