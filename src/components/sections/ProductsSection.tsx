import { useState } from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { AnimatedSection } from '@/components/AnimatedSection';
import type { Product } from '@/data/products';

export function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="products" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <AnimatedSection animation="fade-in">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              Our Products
            </span>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={100}>
            <h2 className="heading-section text-foreground mb-4">
              The Aura Lineup
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={200}>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Five handcrafted facewashes, each designed to address your unique skin needs. 
              Find your perfect match.
            </p>
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
            All products: <span className="font-semibold text-primary">₹299</span> for 100ml
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
