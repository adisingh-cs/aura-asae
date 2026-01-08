import { useEffect, useState, useMemo } from 'react';
import { Butterfly } from './Butterfly';
import { SpringPetal } from './SpringPetal';

const BUTTERFLY_COUNT = 6;
const PETAL_COUNT = 10;

export function MagicalCreaturesCanvas() {
  const [cursorPosition, setCursorPosition] = useState({ x: -1000, y: -1000 });
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Delay mount to allow loading screen to finish
    const timer = setTimeout(() => setMounted(true), 2600);
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    return () => clearTimeout(timer);
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

  // Generate butterfly configurations
  const butterflies = useMemo(() => {
    const colors: Array<'pink' | 'lavender' | 'rose' | 'coral' | 'golden'> = ['pink', 'lavender', 'rose', 'coral', 'golden'];
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    return Array.from({ length: BUTTERFLY_COUNT }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      size: sizes[i % sizes.length],
      initialX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      initialY: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
    }));
  }, []);

  // Generate petal configurations
  const petals = useMemo(() => {
    const colors: Array<'pink' | 'white' | 'lavender'> = ['pink', 'white', 'lavender'];

    return Array.from({ length: PETAL_COUNT }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      initialX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
    }));
  }, []);

  if (!mounted || prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {/* Cherry blossom petals */}
      {petals.map((petal) => (
        <SpringPetal
          key={`petal-${petal.id}`}
          id={petal.id}
          color={petal.color}
          initialX={petal.initialX}
          cursorPosition={cursorPosition}
        />
      ))}
      
      {/* Butterflies */}
      {butterflies.map((butterfly) => (
        <Butterfly
          key={`butterfly-${butterfly.id}`}
          id={butterfly.id}
          color={butterfly.color}
          size={butterfly.size}
          initialX={butterfly.initialX}
          initialY={butterfly.initialY}
          cursorPosition={cursorPosition}
        />
      ))}
    </div>
  );
}
