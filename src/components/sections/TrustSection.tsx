import { brandFeatures } from '@/data/products';
import { TrustBadge } from '@/components/TrustBadge';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLocale } from '@/lib/i18n/LocaleContext';

export function TrustSection() {
  const { t } = useLocale();

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <AnimatedSection animation="fade-in">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              {t.trust.label}
            </span>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={100}>
            <h2 className="heading-section text-foreground mb-4">
              {t.trust.title}
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={200}>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              {t.trust.subtitle}
            </p>
          </AnimatedSection>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {brandFeatures.map((feature, index) => (
            <TrustBadge
              key={feature.title}
              icon={feature.icon}
              title={t.trust.features[index]?.title || feature.title}
              description={t.trust.features[index]?.description || feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
