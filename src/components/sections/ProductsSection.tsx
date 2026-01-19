import { useState } from 'react';
import { Gift } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLocale } from '@/lib/i18n/LocaleContext';
import type { Product } from '@/data/products';

export function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { t, formatPrice, isIndia, currentLocale } = useLocale();

  const priceNote = isIndia 
    ? t.products.priceNote.replace('{price}', formatPrice())
    : `${t.products.priceNote.replace('{price}', formatPrice())} + ${t.international.shippingCost.replace('{price}', formatPrice(currentLocale.shippingCost))}`;

  // Freebie threshold - use locale-specific or default to equivalent of ₹100
  const freebieThreshold = currentLocale.freebieThreshold || Math.ceil(100 * currentLocale.productPrice / 349);
  const freebieMessage = t.promo.freebie.replace('{threshold}', `${currentLocale.symbol}${freebieThreshold}`);

  return (
    <section id="products" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <AnimatedSection animation="fade-in">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              {t.products.label}
            </span>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={100}>
            <h2 className="heading-section text-foreground mb-4">
              {t.products.title}
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={200}>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              {t.products.subtitle}
            </p>
          </AnimatedSection>

          {/* Freebie Promo Banner */}
          <AnimatedSection animation="fade-in" delay={300}>
            <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-full px-6 py-3">
              <Gift className="w-5 h-5 text-primary animate-bounce" />
              <span className="text-sm font-medium text-primary">
                {freebieMessage}
              </span>
            </div>
          </AnimatedSection>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {/* Pricing Note */}
        <AnimatedSection animation="fade-in" delay={500}>
          <p className="text-center mt-8 text-muted-foreground">
            {priceNote}
          </p>
        </AnimatedSection>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
