import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SnowflakeProps {
  id: number;
  size: 'sm' | 'md' | 'lg';
  initialX: number;
  cursorPosition: { x: number; y: number };
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-5 h-5',
  lg: 'w-7 h-7',
};

export function Snowflake({ id, size, initialX, cursorPosition }: SnowflakeProps) {
  const [position, setPosition] = useState({ x: initialX, y: -20 });
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(0.7 + Math.random() * 0.3);
  const velocityRef = useRef({ x: 0, y: 0.5 + Math.random() * 0.5 });
  const animationFrameRef = useRef<number>();
  const driftPhaseRef = useRef(Math.random() * Math.PI * 2);

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        // Gentle drift
        const drift = Math.sin(Date.now() / 2000 + driftPhaseRef.current) * 0.3;
        velocityRef.current.x = drift;

        // Cursor avoidance
        const dx = cursorPosition.x - prev.x;
        const dy = cursorPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          velocityRef.current.x -= (dx / distance) * 1.5;
          velocityRef.current.y -= (dy / distance) * 0.3;
        }

        // Gentle falling
        velocityRef.current.y = Math.min(velocityRef.current.y + 0.005, 1);

        let newX = prev.x + velocityRef.current.x;
        let newY = prev.y + velocityRef.current.y;

        // Reset when reaching bottom
        if (newY > window.innerHeight + 20) {
          newY = -20;
          newX = Math.random() * window.innerWidth;
          velocityRef.current.y = 0.5 + Math.random() * 0.5;
          setOpacity(0.7 + Math.random() * 0.3);
        }

        return { x: newX, y: newY };
      });

      // Gentle rotation
      setRotation(prev => prev + 0.5);

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
      className={cn(
        "absolute pointer-events-none",
        sizeClasses[size]
      )}
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        opacity,
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full fill-sky-100">
        {/* Six-pointed snowflake */}
        <g stroke="currentColor" strokeWidth="3" fill="none" className="stroke-sky-200">
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 50 50)`}>
              <line x1="50" y1="50" x2="50" y2="10" />
              <line x1="50" y1="20" x2="40" y2="30" />
              <line x1="50" y1="20" x2="60" y2="30" />
              <line x1="50" y1="30" x2="43" y2="35" />
              <line x1="50" y1="30" x2="57" y2="35" />
            </g>
          ))}
        </g>
        {/* Center */}
        <circle cx="50" cy="50" r="5" className="fill-sky-100" />
      </svg>
      
      {/* Shimmer effect */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
          animation: `shimmer 2s ease-in-out infinite`,
          animationDelay: `${id * 200}ms`,
        }}
      />
    </div>
  );
}
