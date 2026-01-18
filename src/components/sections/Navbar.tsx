import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import auraLogo from '@/assets/aura-logo.webp';
import { cn } from '@/lib/utils';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { CountrySelector } from '@/components/CountrySelector';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, isIndia, currentLocale, formatPrice } = useLocale();

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#products', label: t.nav.products },
    { href: '#ingredients', label: t.nav.ingredients },
    { href: '#testimonials', label: t.nav.reviews },
    { href: '#contact', label: t.nav.contact }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
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
            <a href="#" className="flex items-center gap-2" aria-label="Aura Cosmetics - Home">
              <img
                src={auraLogo}
                alt="Aura Cosmetics - Organic Handcrafted Skincare Logo"
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                width={48}
                height={48}
              />
              <span className="font-serif text-xl md:text-2xl font-bold text-foreground">
                AURA
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <CountrySelector />
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <CountrySelector variant="navbar" />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <nav
          className={cn(
            "md:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300",
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
          aria-label="Mobile navigation"
          aria-hidden={!isMobileMenuOpen}
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
        </nav>
      </nav>

      {/* Promo Banner - India Only */}
      {isIndia ? (
        <div className="bg-primary text-primary-foreground py-1.5 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="mx-4 text-xs sm:text-sm font-medium">
                {t.promo.freeDelivery}  •  {t.promo.limitedOffer}  •  
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-muted text-muted-foreground py-1.5 text-center text-xs sm:text-sm">
          {t.international.shippingAvailable} • {t.international.shippingCost.replace('{price}', formatPrice(currentLocale.shippingCost))}
        </div>
      )}
    </header>
  );
}
