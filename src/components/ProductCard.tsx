import { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import { AnimatedSection } from './AnimatedSection';

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: () => void;
}

export function ProductCard({ product, index, onClick }: ProductCardProps) {
  return (
    <AnimatedSection
      animation="scale-in"
      delay={index * 100}
      className="h-full"
    >
      <button
        onClick={onClick}
        className={cn(
          "card-product w-full h-full flex flex-col cursor-pointer group text-left",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
        aria-label={`View details for ${product.name}`}
      >
        {/* Image Container */}
        <div className={cn(
          "relative aspect-[3/4] overflow-hidden",
          product.bgColor
        )}>
          <img
            src={product.thumbnailImage}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width={224}
            height={298}
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 flex flex-col flex-grow">
          <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground mb-1">
            {product.shortName}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 flex-grow">
            {product.tagline}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">
              ₹{product.price}
            </span>
            <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
              View Details →
            </span>
          </div>
        </div>
      </button>
    </AnimatedSection>
  );
}
