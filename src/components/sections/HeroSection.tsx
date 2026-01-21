import { ArrowDown, Gift, Star } from 'lucide-react';
import heroImage from '@/assets/hero-section.webp';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLocale } from '@/lib/i18n/LocaleContext';

export function HeroSection() {
  const { t } = useLocale();

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
      aria-labelledby="hero-title"
      itemScope 
      itemType="https://schema.org/Product"
    >
      {/* Hidden structured data for SEO */}
      <meta itemProp="name" content="Aura Cosmetics Organic Facewash Collection" />
      <meta itemProp="description" content="100% organic, handcrafted facewash made in India. Vitamin C, Coffee, Rice Milk, Beetroot & Niacinamide formulas." />
      <meta itemProp="brand" content="Aura Cosmetics" />
      <link itemProp="url" href="https://auracosmetics.in/" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-float-slow animation-delay-200" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-primary/5 blur-2xl animate-float animation-delay-400" />
      </div>

      <div className="container mx-auto px-4 pt-28 md:pt-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <AnimatedSection animation="fade-in-left" delay={100}>
              <span className="inline-block px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary mb-6">
                {t.hero.badge}
              </span>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-left" delay={200}>
              <h1 id="hero-title" className="heading-display mb-6">
                <span className="text-gradient" itemProp="brand">AURA</span>
                <br />
                <span className="text-foreground">Cosmetics</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-left" delay={300}>
              <p className="text-body-lg text-muted-foreground mb-4 max-w-xl mx-auto lg:mx-0">
                {t.hero.tagline}
              </p>
              {/* Trust signals for reducing bounce rate */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <span itemProp="ratingValue">5.0</span>/5 from <span itemProp="reviewCount">500+</span> happy customers
                </span>
                <meta itemProp="bestRating" content="5" />
              </div>
            </AnimatedSection>

            {/* Freebie Promo Banner */}
            <AnimatedSection animation="fade-in-left" delay={350}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-full px-5 py-2.5 mb-8" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <Gift className="w-4 h-4 text-primary animate-bounce" aria-hidden="true" />
                <span className="text-sm font-medium text-primary">
                  Get a FREE gift on every order worth ₹100 or more!
                </span>
                <meta itemProp="price" content="349" />
                <meta itemProp="priceCurrency" content="INR" />
                <meta itemProp="availability" content="https://schema.org/InStock" />
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-left" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="#products" 
                  className="btn-hero"
                  aria-label="Browse our organic facewash collection"
                >
                  {t.hero.cta}
                  <ArrowDown className="w-5 h-5 animate-bounce" aria-hidden="true" />
                </a>
                <a 
                  href="#about" 
                  className="btn-secondary"
                  aria-label="Learn more about Aura Cosmetics"
                >
                  {t.hero.secondary}
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <AnimatedSection animation="fade-in-right" delay={300}>
              <figure className="relative">
                <div className="absolute -top-4 -right-4 w-8 h-8 text-primary/40 animate-butterfly-float" aria-hidden="true" />
                <div className="absolute top-1/4 -left-8 w-6 h-6 text-primary/30 animate-butterfly-float animation-delay-300" aria-hidden="true" />
                
                <img 
                  src={heroImage} 
                  alt="Aura Cosmetics Premium Organic Facewash Collection - 5 Handcrafted Variants: Vitamin C, Coffee, Rice Milk, Beetroot, and Niacinamide - Made in India" 
                  className="w-full max-w-lg lg:max-w-xl animate-float-slow"
                  width={576}
                  height={686}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 576px"
                  fetchPriority="high"
                  decoding="async"
                  itemProp="image"
                  loading="eager"
                />
                <figcaption className="sr-only">
                  Aura Cosmetics organic facewash collection featuring Vitamin C, Coffee, Rice Milk, Beetroot, and Niacinamide variants - 100% handcrafted in India
                </figcaption>
              </figure>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
