import { Star } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  name: string;
  age: number;
  product: string;
  text: string;
  rating: number;
  index: number;
}

export function TestimonialCard({
  name,
  age,
  product,
  text,
  rating,
  index
}: TestimonialCardProps) {
  return (
    <AnimatedSection
      animation="slide-up"
      delay={index * 150}
    >
      <div className={cn(
        "p-6 md:p-8 rounded-2xl h-full",
        "bg-card border border-border/50",
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      )}>
        {/* Rating Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-aura-lemon text-aura-lemon"
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-foreground mb-6 leading-relaxed">
          "{text}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {name}, {age}
            </p>
            <p className="text-sm text-muted-foreground">
              Loves {product}
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
