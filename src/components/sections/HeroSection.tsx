import { ArrowDown } from 'lucide-react';
import auraCover from '@/assets/aura-cover.png';
import { AnimatedSection } from '@/components/AnimatedSection';
export function HeroSection() {
  return <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-float-slow animation-delay-200" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-primary/5 blur-2xl animate-float animation-delay-400" />
      </div>

      <div className="container mx-auto px-4 pt-20 md:pt-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <AnimatedSection animation="fade-in-left" delay={100}>
              <span className="inline-block px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary mb-6">
                Organic • Handcrafted • Premium
              </span>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-left" delay={200}>
              <h1 className="heading-display mb-6">
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
                <a href="#products" className="btn-hero">
                  Explore Products
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </a>
                <a href="#about" className="btn-secondary">
                  Our Story
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <AnimatedSection animation="fade-in-right" delay={300}>
              <div className="relative">
                {/* Floating butterflies effect */}
                <div className="absolute -top-4 -right-4 w-8 h-8 text-primary/40 animate-butterfly-float" />
                <div className="absolute top-1/4 -left-8 w-6 h-6 text-primary/30 animate-butterfly-float animation-delay-300" />
                
                <img src={auraCover} alt="Aura Cosmetics - Premium Organic Skincare" className="w-full max-w-lg lg:max-w-xl rounded-2xl shadow-2xl" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      
    </section>;
}