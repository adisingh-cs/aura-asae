import { memo, useMemo, useState, lazy, Suspense } from 'react';
import { Star, ZoomIn } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

interface TestimonialCardProps {
  name: string;
  age: number;
  product: string;
  text: string;
  rating: number;
  image: string;
  index: number;
}

// Memoized star component for performance
const RatingStars = memo(function RatingStars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const stars = useMemo(() => Array.from({ length: rating }), [rating]);
  const sizeClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  
  return (
    <div className="flex gap-1">
      {stars.map((_, i) => (
        <Star key={i} className={cn(sizeClass, "fill-aura-lemon text-aura-lemon")} />
      ))}
    </div>
  );
});

export const TestimonialCard = memo(function TestimonialCard({
  name,
  age,
  product,
  text,
  rating,
  image,
  index
}: TestimonialCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const altText = useMemo(() => `${name}'s review of ${product}`, [name, product]);

  return (
    <AnimatedSection animation="slide-up" delay={index * 100}>
      <div className={cn(
        "rounded-2xl overflow-hidden h-full flex flex-col",
        "bg-card border border-border/50",
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      )}>
        {/* Clickable Image Thumbnail */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="relative aspect-square overflow-hidden group cursor-pointer">
              {/* Placeholder skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              <img
                src={image}
                alt={altText}
                className={cn(
                  "w-full h-full object-cover transition-all duration-500",
                  "group-hover:scale-105",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                loading="lazy"
                decoding="async"
                width={400}
                height={400}
                onLoad={() => setImageLoaded(true)}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-primary/90 rounded-full p-3">
                  <ZoomIn className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-2 bg-background/95 backdrop-blur-sm border-border">
            <div className="relative">
              <img
                src={image}
                alt={altText}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                loading="eager"
              />
              {/* Review info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent p-4 md:p-6 rounded-b-lg">
                <div className="mb-2">
                  <RatingStars rating={rating} size="md" />
                </div>
                <p className="text-foreground text-sm md:text-base mb-2">"{text}"</p>
                <p className="text-sm font-medium text-primary">{name}, {age} • {product}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Review Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Rating Stars */}
          <div className="mb-2">
            <RatingStars rating={rating} />
          </div>

          {/* Quote */}
          <blockquote className="text-foreground text-sm leading-relaxed mb-3 flex-1">
            "{text}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center gap-2 pt-3 border-t border-border/50">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-primary">
                {name.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm truncate">
                {name}, {age}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {product}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
});
