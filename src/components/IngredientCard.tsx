import { Sun, Coffee, Droplet, Heart, Sparkles, Milk } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { cn } from '@/lib/utils';

interface IngredientCardProps {
  name: string;
  benefit: string;
  icon: string;
  index: number;
}

const iconMap = {
  sun: Sun,
  coffee: Coffee,
  droplet: Droplet,
  heart: Heart,
  sparkles: Sparkles,
  milk: Milk
};

export function IngredientCard({ name, benefit, icon, index }: IngredientCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Sparkles;

  return (
    <AnimatedSection
      animation="scale-in"
      delay={index * 80}
    >
      <div className={cn(
        "p-4 md:p-6 rounded-xl text-center group",
        "bg-card/80 backdrop-blur-sm border border-border/30",
        "transition-all duration-300 hover:bg-card hover:shadow-md hover:scale-105"
      )}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3 transition-all duration-300 group-hover:bg-primary/20">
          <IconComponent className="w-6 h-6 text-primary" />
        </div>
        <h4 className="font-semibold text-foreground mb-1">
          {name}
        </h4>
        <p className="text-sm text-muted-foreground">
          {benefit}
        </p>
      </div>
    </AnimatedSection>
  );
}
