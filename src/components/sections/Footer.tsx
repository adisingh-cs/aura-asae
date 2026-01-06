import { Instagram, Mail, Phone, Heart, Leaf, Sparkles, Shield } from 'lucide-react';
import auraLogo from '@/assets/aura-logo.png';
import { contactInfo, products } from '@/data/products';
import { AnimatedSection } from '@/components/AnimatedSection';

const quickLinks = [
  { href: '#about', label: 'About Us' },
  { href: '#products', label: 'Products' },
  { href: '#ingredients', label: 'Ingredients' },
  { href: '#faq', label: 'FAQs' },
  { href: '#contact', label: 'Contact' }
];

const brandPromises = [
  { icon: Leaf, text: '100% Organic' },
  { icon: Sparkles, text: 'Handcrafted' },
  { icon: Shield, text: 'Paraben-Free' }
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 md:py-20 relative">
        {/* Top Section - Brand & Promise */}
        <AnimatedSection animation="fade-in" className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img
              src={auraLogo}
              alt="Aura Cosmetics"
              className="w-14 h-14 object-contain invert opacity-90"
            />
            <span className="font-serif text-3xl font-bold tracking-wide">AURA</span>
          </div>
          <p className="text-background/70 max-w-md mx-auto leading-relaxed mb-8">
            Organic, handcrafted skincare for the conscious generation. 
            Let your natural glow shine through — with Aura.
          </p>
          
          {/* Brand Promises */}
          <div className="flex flex-wrap justify-center gap-6">
            {brandPromises.map((promise, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-background/60">
                <promise.icon className="w-4 h-4 text-primary" />
                <span>{promise.text}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Middle Section - Products & Links */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-16 border-t border-b border-background/10 py-12">
          {/* Products */}
          <AnimatedSection animation="fade-in" delay={100}>
            <h4 className="font-semibold text-lg mb-5 text-center md:text-left">Our Products</h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {products.map((product) => (
                <a
                  key={product.id}
                  href="#products"
                  className="px-3 py-1.5 text-xs rounded-full bg-background/5 text-background/70 hover:bg-background/10 hover:text-background transition-colors"
                >
                  {product.shortName}
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection animation="fade-in" delay={200} className="text-center">
            <h4 className="font-semibold text-lg mb-5">Quick Links</h4>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </AnimatedSection>

          {/* Contact */}
          <AnimatedSection animation="fade-in" delay={300} className="text-center md:text-right">
            <h4 className="font-semibold text-lg mb-5">Get in Touch</h4>
            <div className="space-y-3">
              <a
                href={contactInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center md:justify-end gap-2 text-sm text-background/70 hover:text-background transition-colors w-full"
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

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50 text-center md:text-left">
            © {currentYear} Aura Cosmetics. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-background/50">
            Made with <Heart className="w-3 h-3 text-accent fill-accent" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
