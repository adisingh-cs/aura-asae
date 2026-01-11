import auraLogo from '@/assets/aura-logo.webp';
import { AnimatedSection } from '@/components/AnimatedSection';

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <AnimatedSection animation="fade-in-left" className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl" />
              <img
                src={auraLogo}
                alt="Aura Cosmetics Logo"
                className="relative w-64 md:w-80 lg:w-96 opacity-90"
                width={384}
                height={384}
                loading="lazy"
              />
            </div>
          </AnimatedSection>

          {/* Content */}
          <div>
            <AnimatedSection animation="fade-in-right">
              <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
                Our Story
              </span>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-right" delay={100}>
              <h2 className="heading-section text-foreground mb-6">
                Skincare That 
                <span className="text-primary"> Understands </span>
                You
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-right" delay={200}>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Born in 2025, Aura Cosmetics emerged from a simple belief: your skin deserves 
                  ingredients you can trust. We're a young brand created for young people who 
                  refuse to compromise on what they put on their skin.
                </p>
                <p>
                  Every Aura product is meticulously handcrafted using 100% organic ingredients, 
                  carefully sourced and blended to deliver real results without harsh chemicals. 
                  We believe in gentle yet effective skincare that works with your skin's natural 
                  rhythm.
                </p>
                <p>
                  From vitamin C brightening to niacinamide clarity, each formula is designed 
                  to address real concerns faced by college students and young professionals — 
                  because glowing skin shouldn't require a complicated routine or a hefty budget.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-right" delay={300}>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-secondary-foreground">Est. 2025</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-secondary-foreground">100% Organic</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-secondary-foreground">Made with Love</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
