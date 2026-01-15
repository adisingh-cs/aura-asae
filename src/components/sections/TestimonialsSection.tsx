import { memo, useMemo } from 'react';
import { testimonials } from '@/data/products';
import { TestimonialCard } from '@/components/TestimonialCard';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLocale } from '@/lib/i18n/LocaleContext';

export const TestimonialsSection = memo(function TestimonialsSection() {
  const { t } = useLocale();

  // Map testimonial IDs to translation keys
  const testimonialKeys = useMemo(() => [
    'kavya', 'sneha', 'priya', 'ananya', 'ritika', 'diya', 'meera', 'aisha', 'tanvi'
  ], []);

  // Merge static testimonial data with translated text
  const translatedTestimonials = useMemo(() => {
    return testimonials.map((testimonial, index) => {
      const key = testimonialKeys[index];
      const translation = t.testimonials.items[key];
      return {
        ...testimonial,
        product: translation?.product || testimonial.product,
        text: translation?.text || testimonial.text
      };
    });
  }, [t.testimonials.items, testimonialKeys]);

  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <AnimatedSection animation="fade-in">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              {t.testimonials.label}
            </span>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={100}>
            <h2 className="heading-section text-foreground mb-4">
              {t.testimonials.title}
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={200}>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              {t.testimonials.subtitle}
            </p>
          </AnimatedSection>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {translatedTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              age={testimonial.age}
              product={testimonial.product}
              text={testimonial.text}
              rating={testimonial.rating}
              image={testimonial.image}
              index={index}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <AnimatedSection animation="fade-in" delay={600}>
          <p className="text-center mt-8 text-xs text-muted-foreground">
            {t.testimonials.disclaimer}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
});
