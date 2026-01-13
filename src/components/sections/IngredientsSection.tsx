import { ingredients } from '@/data/products';
import { IngredientCard } from '@/components/IngredientCard';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLocale } from '@/lib/i18n/LocaleContext';

export function IngredientsSection() {
  const { t } = useLocale();

  return (
    <section id="ingredients" className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-56 h-56 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <AnimatedSection animation="fade-in">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              {t.ingredients.label}
            </span>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={100}>
            <h2 className="heading-section text-foreground mb-4">
              {t.ingredients.title}
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={200}>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              {t.ingredients.subtitle}
            </p>
          </AnimatedSection>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {ingredients.map((ingredient, index) => (
            <IngredientCard
              key={ingredient.name}
              name={t.ingredients.items[index]?.name || ingredient.name}
              benefit={t.ingredients.items[index]?.benefit || ingredient.benefit}
              icon={ingredient.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
