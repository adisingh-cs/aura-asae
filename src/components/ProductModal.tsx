import { X, Check, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/data/products';
import { contactInfo } from '@/data/products';
import { cn } from '@/lib/utils';
import { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!product || !isOpen) return null;

  const images = [product.primaryImage, product.thumbnailImage];

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${product.name}. Can you tell me more?`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={cn(
        "relative w-full max-w-4xl max-h-[90vh] overflow-y-auto",
        "bg-background rounded-2xl shadow-2xl",
        "animate-scale-in"
      )}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-muted transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Carousel Section */}
          <div className={cn(
            "relative aspect-square md:aspect-auto md:h-full",
            product.bgColor,
            "flex items-center justify-center"
          )}>
            <div className="w-full h-full overflow-hidden" ref={emblaRef}>
              <div className="flex h-full">
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className="flex-[0_0_100%] min-w-0 flex items-center justify-center p-8"
                  >
                    <img
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="max-w-full max-h-80 md:max-h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors shadow-md"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    selectedIndex === index 
                      ? "bg-primary w-4" 
                      : "bg-foreground/30 hover:bg-foreground/50"
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
              {product.size} • ₹{product.price}
            </span>

            <h2
              id="product-modal-title"
              className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2"
            >
              {product.name}
            </h2>

            <p className="text-primary font-medium mb-4">
              {product.tagline}
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Benefits */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Suitable For */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Suitable For</h3>
              <div className="flex flex-wrap gap-2">
                {product.suitableFor.map((type, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="p-4 rounded-xl bg-muted/50 mb-6">
              <h3 className="font-semibold text-foreground mb-2 text-sm">Full Ingredients</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {product.ingredients}
              </p>
            </div>

            {/* CTA */}
            <a
              href={`${contactInfo.whatsappLink}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero w-full"
            >
              <MessageCircle className="w-5 h-5" />
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
