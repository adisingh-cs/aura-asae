import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AutumnLeafProps {
  id: number;
  variant: 'maple' | 'oak' | 'simple';
  color: 'orange' | 'red' | 'golden' | 'brown';
  initialX: number;
  cursorPosition: { x: number; y: number };
}

const colorClasses = {
  orange: 'fill-orange-500',
  red: 'fill-red-600',
  golden: 'fill-amber-400',
  brown: 'fill-amber-700',
};

export function AutumnLeaf({ id, variant, color, initialX, cursorPosition }: AutumnLeafProps) {
  const [position, setPosition] = useState({ x: initialX, y: -50 });
  const [rotation, setRotation] = useState(Math.random() * 360);
  const velocityRef = useRef({ x: 0, y: 1 + Math.random() * 0.5 });
  const animationFrameRef = useRef<number>();
  const swayOffsetRef = useRef(Math.random() * Math.PI * 2);

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        // Wind sway effect
        const sway = Math.sin(Date.now() / 1000 + swayOffsetRef.current) * 0.8;
        velocityRef.current.x = sway + (Math.random() - 0.5) * 0.2;

        // Cursor avoidance
        const dx = cursorPosition.x - prev.x;
        const dy = cursorPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          velocityRef.current.x -= (dx / distance) * 2;
          velocityRef.current.y -= (dy / distance) * 0.5;
        }

        // Gravity
        velocityRef.current.y = Math.min(velocityRef.current.y + 0.01, 2);

        let newX = prev.x + velocityRef.current.x;
        let newY = prev.y + velocityRef.current.y;

        // Reset when reaching bottom
        if (newY > window.innerHeight + 50) {
          newY = -50;
          newX = Math.random() * window.innerWidth;
          velocityRef.current.y = 1 + Math.random() * 0.5;
        }

        return { x: newX, y: newY };
      });

      // Rotate while falling
      setRotation(prev => prev + velocityRef.current.x * 2);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cursorPosition]);

  const LeafSVG = () => {
    switch (variant) {
      case 'maple':
        return (
          <svg viewBox="0 0 100 100" className={cn("w-full h-full", colorClasses[color])}>
            <path d="M50 5 L55 25 L75 15 L65 35 L90 40 L65 50 L85 70 L60 60 L50 95 L40 60 L15 70 L35 50 L10 40 L35 35 L25 15 L45 25 Z" />
            <line x1="50" y1="50" x2="50" y2="95" className="stroke-amber-800" strokeWidth="3" />
          </svg>
        );
      case 'oak':
        return (
          <svg viewBox="0 0 100 100" className={cn("w-full h-full", colorClasses[color])}>
            <path d="M50 5 Q65 20 70 35 Q80 35 85 45 Q75 50 75 60 Q85 65 80 80 L50 95 L20 80 Q15 65 25 60 Q25 50 15 45 Q20 35 30 35 Q35 20 50 5 Z" />
            <line x1="50" y1="50" x2="50" y2="95" className="stroke-amber-800" strokeWidth="2" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 100" className={cn("w-full h-full", colorClasses[color])}>
            <ellipse cx="50" cy="45" rx="35" ry="40" />
            <line x1="50" y1="45" x2="50" y2="95" className="stroke-amber-800" strokeWidth="3" />
          </svg>
        );
    }
  };

  return (
    <div
      className="absolute w-8 h-8 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        opacity: 0.9,
        filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))',
      }}
    >
      <LeafSVG />
    </div>
  );
}
