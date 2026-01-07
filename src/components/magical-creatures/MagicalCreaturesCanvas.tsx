import { useEffect, useState, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { useSeason } from '@/contexts/SeasonContext';
import { Butterfly } from './Butterfly';
import { Firefly } from './Firefly';
import { AutumnLeaf } from './AutumnLeaf';
import { Snowflake } from './Snowflake';
import { SpringPetal } from './SpringPetal';

const CREATURE_COUNT = 8;

interface CreatureConfig {
  id: number;
  x: number;
  y: number;
  // Butterfly specific
  butterflyColor?: 'pink' | 'lavender' | 'rose' | 'coral' | 'golden';
  butterflySize?: 'sm' | 'md' | 'lg';
  // Leaf specific
  leafVariant?: 'maple' | 'oak' | 'simple';
  leafColor?: 'orange' | 'red' | 'golden' | 'brown';
  // Snowflake specific
  snowflakeSize?: 'sm' | 'md' | 'lg';
  // Petal specific
  petalColor?: 'pink' | 'white' | 'lavender';
}

export function MagicalCreaturesCanvas() {
  const { resolvedTheme } = useTheme();
  const { season } = useSeason();
  const [cursorPosition, setCursorPosition] = useState({ x: -1000, y: -1000 });
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  // Track cursor position
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  // Generate creature configurations
  const creatures = useMemo<CreatureConfig[]>(() => {
    const butterflyColors: CreatureConfig['butterflyColor'][] = ['pink', 'lavender', 'rose', 'coral', 'golden'];
    const butterflySizes: CreatureConfig['butterflySize'][] = ['sm', 'md', 'lg'];
    const leafVariants: CreatureConfig['leafVariant'][] = ['maple', 'oak', 'simple'];
    const leafColors: CreatureConfig['leafColor'][] = ['orange', 'red', 'golden', 'brown'];
    const snowflakeSizes: CreatureConfig['snowflakeSize'][] = ['sm', 'md', 'lg'];
    const petalColors: CreatureConfig['petalColor'][] = ['pink', 'white', 'lavender'];

    return Array.from({ length: CREATURE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      butterflyColor: butterflyColors[Math.floor(Math.random() * butterflyColors.length)],
      butterflySize: butterflySizes[Math.floor(Math.random() * butterflySizes.length)],
      leafVariant: leafVariants[Math.floor(Math.random() * leafVariants.length)],
      leafColor: leafColors[Math.floor(Math.random() * leafColors.length)],
      snowflakeSize: snowflakeSizes[Math.floor(Math.random() * snowflakeSizes.length)],
      petalColor: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));
  }, []);

  if (!mounted || prefersReducedMotion) return null;

  const isDark = resolvedTheme === 'dark';

  // Dark mode = fireflies regardless of season
  if (isDark) {
    return (
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {creatures.map((creature) => (
          <Firefly
            key={creature.id}
            id={creature.id}
            initialX={creature.x}
            initialY={creature.y}
            cursorPosition={cursorPosition}
          />
        ))}
      </div>
    );
  }

  // Light mode with seasonal variants
  const renderCreatures = () => {
    switch (season) {
      case 'spring':
        return (
          <>
            {creatures.slice(0, 5).map((creature) => (
              <SpringPetal
                key={`petal-${creature.id}`}
                id={creature.id}
                color={creature.petalColor!}
                initialX={creature.x}
                cursorPosition={cursorPosition}
              />
            ))}
            {creatures.slice(5).map((creature) => (
              <Butterfly
                key={`butterfly-${creature.id}`}
                id={creature.id}
                color={creature.butterflyColor!}
                size={creature.butterflySize!}
                initialX={creature.x}
                initialY={creature.y}
                cursorPosition={cursorPosition}
              />
            ))}
          </>
        );

      case 'autumn':
        return creatures.map((creature) => (
          <AutumnLeaf
            key={creature.id}
            id={creature.id}
            variant={creature.leafVariant!}
            color={creature.leafColor!}
            initialX={creature.x}
            cursorPosition={cursorPosition}
          />
        ));

      case 'winter':
        return creatures.map((creature) => (
          <Snowflake
            key={creature.id}
            id={creature.id}
            size={creature.snowflakeSize!}
            initialX={creature.x}
            cursorPosition={cursorPosition}
          />
        ));

      case 'summer':
      default:
        return creatures.map((creature) => (
          <Butterfly
            key={creature.id}
            id={creature.id}
            color={creature.butterflyColor!}
            size={creature.butterflySize!}
            initialX={creature.x}
            initialY={creature.y}
            cursorPosition={cursorPosition}
          />
        ));
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {renderCreatures()}
    </div>
  );
}
