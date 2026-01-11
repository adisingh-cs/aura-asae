import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import auraLogo from '@/assets/aura-logo.webp';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#products', label: 'Products' },
  { href: '#ingredients', label: 'Ingredients' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact', label: 'Contact' }
];

const promoText = "🚚 FREE DELIVERY on orders above ₹500  •  🔥 LIMITED TIME: Get 2 Facewash for just ₹500!  •  ";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Main Navigation */}
      <nav
        className={cn(
          "transition-all duration-300",
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <img
                src={auraLogo}
                alt="Aura Cosmetics"
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
              <span className="font-serif text-xl md:text-2xl font-bold text-foreground">
                AURA
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300",
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
        >
          <div className="container mx-auto px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-base font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Promo Banner */}
      <div className="bg-primary text-primary-foreground py-1.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mx-4 text-xs sm:text-sm font-medium">
              {promoText}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
