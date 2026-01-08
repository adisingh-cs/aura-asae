import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ButterflyProps {
  id: number;
  color: 'pink' | 'lavender' | 'rose' | 'coral' | 'golden';
  size: 'sm' | 'md' | 'lg';
  initialX: number;
  initialY: number;
  cursorPosition: { x: number; y: number };
}

const colorClasses = {
  pink: 'fill-pink-300',
  lavender: 'fill-primary',
  rose: 'fill-accent',
  coral: 'fill-orange-300',
  golden: 'fill-amber-300',
};

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

export function Butterfly({ id, color, size, initialX, initialY, cursorPosition }: ButterflyProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isEvading, setIsEvading] = useState(false);
  const [isResting, setIsResting] = useState(Math.random() > 0.7);
  const velocityRef = useRef({ x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 });
  const animationFrameRef = useRef<number>();
  const targetRef = useRef({ x: initialX, y: initialY });

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        const dx = cursorPosition.x - prev.x;
        const dy = cursorPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Evade cursor if too close
        if (distance < 150 && !isResting) {
          setIsEvading(true);
          const escapeX = -dx / distance * 8;
          const escapeY = -dy / distance * 8;
          velocityRef.current = { x: escapeX, y: escapeY };
        } else if (isEvading && distance > 200) {
          setIsEvading(false);
        }

        // Random target movement when not evading
        if (!isEvading && !isResting) {
          if (Math.random() < 0.01) {
            targetRef.current = {
              x: Math.random() * (window.innerWidth - 100) + 50,
              y: Math.random() * (window.innerHeight - 100) + 50,
            };
          }

          const tx = targetRef.current.x - prev.x;
          const ty = targetRef.current.y - prev.y;
          const targetDist = Math.sqrt(tx * tx + ty * ty);
          
          if (targetDist > 10) {
            velocityRef.current.x += (tx / targetDist) * 0.1;
            velocityRef.current.y += (ty / targetDist) * 0.1;
          }
        }

        // Apply friction
        velocityRef.current.x *= 0.98;
        velocityRef.current.y *= 0.98;

        // Random resting behavior
        if (!isResting && Math.random() < 0.001) {
          setIsResting(true);
          setTimeout(() => setIsResting(false), 2000 + Math.random() * 3000);
        }

        if (isResting) {
          velocityRef.current = { x: 0, y: 0 };
          return prev;
        }

        // Add gentle floating motion
        const floatX = Math.sin(Date.now() / 1000 + id) * 0.3;
        const floatY = Math.cos(Date.now() / 800 + id) * 0.2;

        let newX = prev.x + velocityRef.current.x + floatX;
        let newY = prev.y + velocityRef.current.y + floatY;

        // Boundary wrapping
        if (newX < -50) newX = window.innerWidth + 50;
        if (newX > window.innerWidth + 50) newX = -50;
        if (newY < -50) newY = window.innerHeight + 50;
        if (newY > window.innerHeight + 50) newY = -50;

        return { x: newX, y: newY };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cursorPosition, id, isEvading, isResting]);

  const rotation = isResting ? 0 : Math.atan2(velocityRef.current.y, velocityRef.current.x) * (180 / Math.PI);

  return (
    <div
      className={cn(
        "absolute transition-transform pointer-events-none",
        sizeClasses[size],
        isEvading && "scale-110"
      )}
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className={cn("w-full h-full", colorClasses[color])}
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      >
        {/* Left wing */}
        <ellipse
          cx="35"
          cy="40"
          rx="30"
          ry="35"
          className={cn("origin-center", !isResting && "animate-wing-flap")}
          style={{ animationDelay: `${id * 100}ms` }}
        />
        {/* Right wing */}
        <ellipse
          cx="65"
          cy="40"
          rx="30"
          ry="35"
          className={cn("origin-center", !isResting && "animate-wing-flap-reverse")}
          style={{ animationDelay: `${id * 100}ms` }}
        />
        {/* Lower wings */}
        <ellipse cx="35" cy="60" rx="20" ry="25" opacity="0.8" />
        <ellipse cx="65" cy="60" rx="20" ry="25" opacity="0.8" />
        {/* Body */}
        <ellipse cx="50" cy="50" rx="6" ry="30" className="fill-foreground/70" />
        {/* Antennae */}
        <path d="M47 22 Q45 10 40 5" stroke="currentColor" strokeWidth="2" fill="none" className="stroke-foreground/70" />
        <path d="M53 22 Q55 10 60 5" stroke="currentColor" strokeWidth="2" fill="none" className="stroke-foreground/70" />
      </svg>

      {/* Sparkle trail */}
      {!isResting && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/60 animate-sparkle-fade"
              style={{
                left: `${50 + (Math.random() - 0.5) * 20}%`,
                top: `${50 + (Math.random() - 0.5) * 20}%`,
                animationDelay: `${i * 150}ms`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
