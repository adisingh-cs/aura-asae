import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SpringPetalProps {
  id: number;
  color: 'pink' | 'white' | 'lavender';
  initialX: number;
  cursorPosition: { x: number; y: number };
}

const colorClasses = {
  pink: 'fill-pink-200',
  white: 'fill-white',
  lavender: 'fill-purple-200',
};

export function SpringPetal({ id, color, initialX, cursorPosition }: SpringPetalProps) {
  const [position, setPosition] = useState({ x: initialX, y: -30 });
  const [rotation, setRotation] = useState(Math.random() * 360);
  const velocityRef = useRef({ x: 0, y: 0.8 + Math.random() * 0.4 });
  const animationFrameRef = useRef<number>();
  const wobbleRef = useRef(Math.random() * Math.PI * 2);

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        // Gentle wobble
        const wobble = Math.sin(Date.now() / 600 + wobbleRef.current) * 1.2;
        velocityRef.current.x = wobble;

        // Cursor avoidance
        const dx = cursorPosition.x - prev.x;
        const dy = cursorPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          velocityRef.current.x -= (dx / distance) * 2;
          velocityRef.current.y -= (dy / distance) * 0.5;
        }

        // Gentle falling
        velocityRef.current.y = Math.min(velocityRef.current.y + 0.008, 1.5);

        let newX = prev.x + velocityRef.current.x;
        let newY = prev.y + velocityRef.current.y;

        // Reset when reaching bottom
        if (newY > window.innerHeight + 30) {
          newY = -30;
          newX = Math.random() * window.innerWidth;
          velocityRef.current.y = 0.8 + Math.random() * 0.4;
        }

        return { x: newX, y: newY };
      });

      // Gentle tumbling rotation
      setRotation(prev => prev + velocityRef.current.x * 3);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cursorPosition]);

  return (
    <div
      className="absolute w-4 h-5 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
      }}
    >
      <svg viewBox="0 0 40 50" className={cn("w-full h-full", colorClasses[color])}>
        {/* Cherry blossom petal shape */}
        <path d="M20 0 Q35 15 35 30 Q35 45 20 50 Q5 45 5 30 Q5 15 20 0 Z" opacity="0.9" />
        <path d="M20 5 Q28 15 28 28 Q28 40 20 45 Q12 40 12 28 Q12 15 20 5 Z" className="fill-white/30" />
      </svg>
    </div>
  );
}
