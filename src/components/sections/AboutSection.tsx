import auraLogo from '@/assets/aura-logo.webp';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLocale } from '@/lib/i18n/LocaleContext';

export function AboutSection() {
  const { t } = useLocale();

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
                alt="Aura Cosmetics Brand Logo - 100% Organic Handcrafted Skincare Since 2025"
                className="relative w-64 md:w-80 lg:w-96 opacity-90"
                width={384}
                height={384}
                loading="lazy"
                decoding="async"
              />
            </div>
          </AnimatedSection>

          {/* Content */}
          <div>
            <AnimatedSection animation="fade-in-right">
              <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
                {t.about.label}
              </span>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-right" delay={100}>
              <h2 className="heading-section text-foreground mb-6">
                {t.about.title}
                <span className="text-primary"> {t.about.titleHighlight} </span>
                You
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-right" delay={200}>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {t.about.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-right" delay={300}>
              <div className="mt-8 flex flex-wrap gap-4">
                {t.about.badges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm font-medium text-secondary-foreground">{badge}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
