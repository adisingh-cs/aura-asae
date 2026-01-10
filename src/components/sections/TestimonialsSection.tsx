import { testimonials } from '@/data/products';
import { TestimonialCard } from '@/components/TestimonialCard';
import { AnimatedSection } from '@/components/AnimatedSection';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <AnimatedSection animation="fade-in">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              Customer Love
            </span>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={100}>
            <h2 className="heading-section text-foreground mb-4">
              What Our Community Says
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={200}>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Real reviews from real people who've experienced the Aura difference.
            </p>
          </AnimatedSection>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
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
            *These testimonials represent customer experiences. Individual results may vary.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
