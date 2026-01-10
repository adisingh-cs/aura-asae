import { Star } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  name: string;
  age: number;
  product: string;
  text: string;
  rating: number;
  image: string;
  index: number;
}

export function TestimonialCard({
  name,
  age,
  product,
  text,
  rating,
  image,
  index
}: TestimonialCardProps) {
  return (
    <AnimatedSection
      animation="slide-up"
      delay={index * 100}
    >
      <div className={cn(
        "rounded-2xl overflow-hidden h-full",
        "bg-card border border-border/50",
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      )}>
        {/* Review Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={image}
            alt={`${name}'s review of ${product}`}
            className="w-full h-full object-cover"
            loading="lazy"
            width={400}
            height={500}
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          {/* Content overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            {/* Rating Stars */}
            <div className="flex gap-1 mb-2">
              {Array.from({ length: rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 md:w-4 md:h-4 fill-aura-lemon text-aura-lemon"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-foreground text-sm md:text-base mb-3 leading-relaxed line-clamp-3">
              "{text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xs font-semibold text-primary-foreground">
                  {name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {name}, {age}
                </p>
                <p className="text-xs text-muted-foreground">
                  {product}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
