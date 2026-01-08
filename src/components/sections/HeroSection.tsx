import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import heroImage from '@/assets/hero-section.png';
import { AnimatedSection } from '@/components/AnimatedSection';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Slow moving large orbs */}
        <div 
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-primary/5 blur-2xl"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        />
        
        {/* Floating petals - different parallax speeds */}
        <div 
          className="absolute top-[15%] right-[20%] w-4 h-4 rounded-full bg-pink-200/40 blur-sm"
          style={{ transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.5}deg)` }}
        />
        <div 
          className="absolute top-[25%] left-[15%] w-3 h-3 rounded-full bg-primary/30 blur-sm"
          style={{ transform: `translateY(${scrollY * 0.4}px) rotate(${-scrollY * 0.3}deg)` }}
        />
        <div 
          className="absolute top-[10%] left-[45%] w-5 h-5 rounded-full bg-accent/20 blur-sm"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }}
        />
        <div 
          className="absolute top-[35%] right-[30%] w-3 h-3 rounded-full bg-pink-300/30 blur-sm"
          style={{ transform: `translateY(${scrollY * 0.35}px) rotate(${scrollY * 0.4}deg)` }}
        />
        
        {/* Decorative circles with different speeds */}
        <div 
          className="absolute top-[40%] left-[5%] w-16 h-16 rounded-full border border-primary/10"
          style={{ transform: `translateY(${scrollY * 0.2}px) scale(${1 + scrollY * 0.0005})` }}
        />
        <div 
          className="absolute top-[20%] right-[8%] w-20 h-20 rounded-full border border-accent/10"
          style={{ transform: `translateY(${scrollY * 0.12}px) scale(${1 + scrollY * 0.0003})` }}
        />
        
        {/* Sparkle dots */}
        <div 
          className="absolute top-[30%] left-[25%] w-1 h-1 rounded-full bg-primary/50"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div 
          className="absolute top-[18%] right-[35%] w-1.5 h-1.5 rounded-full bg-accent/40"
          style={{ transform: `translateY(${scrollY * 0.45}px)` }}
        />
        <div 
          className="absolute top-[45%] right-[15%] w-1 h-1 rounded-full bg-pink-300/50"
          style={{ transform: `translateY(${scrollY * 0.55}px)` }}
        />
      </div>

      <div className="container mx-auto px-4 pt-20 md:pt-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div 
            className="text-center lg:text-left order-2 lg:order-1"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          >
            <AnimatedSection animation="fade-in-left" delay={100}>
              <span className="inline-block px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary mb-6" data-landing-spot>
                Organic • Handcrafted • Premium
              </span>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-left" delay={200}>
              <h1 className="heading-display mb-6" data-landing-spot>
                <span className="text-gradient">AURA</span>
                <br />
                <span className="text-foreground">Cosmetics</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-left" delay={300}>
              <p className="text-body-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Discover skincare that truly cares. Our organic, handcrafted formulas are 
                designed for young, conscious individuals who value purity and effectiveness.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-left" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#products" className="btn-hero" data-landing-spot>
                  Explore Products
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </a>
                <a href="#about" className="btn-secondary" data-landing-spot>
                  Our Story
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Hero Image with slower parallax */}
          <div 
            className="order-1 lg:order-2 flex justify-center"
            style={{ transform: `translateY(${scrollY * -0.08}px)` }}
          >
            <AnimatedSection animation="fade-in-right" delay={300}>
              <div className="relative" data-landing-spot>
                {/* Floating decorative elements around image */}
                <div 
                  className="absolute -top-8 -right-8 w-6 h-6 rounded-full bg-primary/20 blur-sm"
                  style={{ transform: `translateY(${scrollY * 0.2}px)` }}
                />
                <div 
                  className="absolute top-1/4 -left-12 w-4 h-4 rounded-full bg-accent/25 blur-sm"
                  style={{ transform: `translateY(${scrollY * 0.3}px)` }}
                />
                <div 
                  className="absolute bottom-1/4 -right-6 w-3 h-3 rounded-full bg-pink-300/30 blur-sm"
                  style={{ transform: `translateY(${scrollY * 0.25}px)` }}
                />
                
                <img 
                  src={heroImage} 
                  alt="Aura Cosmetics - Premium Organic Skincare" 
                  className="w-full max-w-lg lg:max-w-xl animate-float-slow" 
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}