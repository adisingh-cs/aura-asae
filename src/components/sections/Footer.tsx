import { Instagram, Mail, Phone, Heart } from 'lucide-react';
import auraLogo from '@/assets/aura-logo.png';
import { contactInfo } from '@/data/products';
import { AnimatedSection } from '@/components/AnimatedSection';

const quickLinks = [
  { href: '#about', label: 'About Us' },
  { href: '#products', label: 'Products' },
  { href: '#ingredients', label: 'Ingredients' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact', label: 'Contact' }
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-12 md:py-16 relative">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand Column */}
          <AnimatedSection animation="fade-in" className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img
                src={auraLogo}
                alt="Aura Cosmetics"
                className="w-12 h-12 object-contain invert opacity-90"
              />
              <span className="font-serif text-2xl font-bold">AURA</span>
            </div>
            <p className="text-sm text-background/70 leading-relaxed max-w-xs mx-auto md:mx-0">
              Organic, handcrafted skincare for the conscious generation. 
              Let your natural glow shine through — with Aura.
            </p>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection animation="fade-in" delay={100} className="text-center">
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-background/70 hover:text-background transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </AnimatedSection>

          {/* Contact */}
          <AnimatedSection animation="fade-in" delay={200} className="text-center md:text-right">
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center justify-center md:justify-end gap-2 text-sm text-background/70 hover:text-background transition-colors"
              >
                <Phone className="w-4 h-4" />
                {contactInfo.phone}
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center justify-center md:justify-end gap-2 text-sm text-background/70 hover:text-background transition-colors"
              >
                <Mail className="w-4 h-4" />
                {contactInfo.email}
              </a>
              <a
                href={contactInfo.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-end gap-2 text-sm text-background/70 hover:text-background transition-colors"
              >
                <Instagram className="w-4 h-4" />
                {contactInfo.instagram}
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-background/50">
              © {currentYear} Aura Cosmetics. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-xs text-background/50">
              Made with <Heart className="w-3 h-3 text-accent" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
