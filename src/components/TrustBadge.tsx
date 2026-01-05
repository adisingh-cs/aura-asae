import { Leaf, Hand, ShieldCheck, Sparkles } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

interface TrustBadgeProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

const iconMap = {
  leaf: Leaf,
  hand: Hand,
  'shield-check': ShieldCheck,
  sparkles: Sparkles
};

export function TrustBadge({ icon, title, description, index }: TrustBadgeProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Sparkles;

  return (
    <AnimatedSection
      animation="fade-in"
      delay={index * 100}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 mb-4 group transition-all duration-300 hover:bg-primary/20 hover:scale-110">
        <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-primary transition-transform duration-300 group-hover:scale-110" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </AnimatedSection>
  );
}
