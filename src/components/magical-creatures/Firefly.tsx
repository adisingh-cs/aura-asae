import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FireflyProps {
  id: number;
  initialX: number;
  initialY: number;
  cursorPosition: { x: number; y: number };
}

export function Firefly({ id, initialX, initialY, cursorPosition }: FireflyProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isEvading, setIsEvading] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(1);
  const velocityRef = useRef({ x: (Math.random() - 0.5) * 1.5, y: (Math.random() - 0.5) * 1.5 });
  const animationFrameRef = useRef<number>();

  // Random glow pulsing
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setGlowIntensity(0.4 + Math.random() * 0.6);
    }, 500 + Math.random() * 1500);

    return () => clearInterval(pulseInterval);
  }, []);

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        const dx = cursorPosition.x - prev.x;
        const dy = cursorPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Evade cursor if too close
        if (distance < 120) {
          setIsEvading(true);
          const escapeX = -dx / distance * 6;
          const escapeY = -dy / distance * 6;
          velocityRef.current = { x: escapeX, y: escapeY };
        } else if (isEvading && distance > 180) {
          setIsEvading(false);
        }

        // Erratic hovering movement
        if (!isEvading) {
          velocityRef.current.x += (Math.random() - 0.5) * 0.3;
          velocityRef.current.y += (Math.random() - 0.5) * 0.3;

          // Limit velocity
          const speed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);
          if (speed > 2) {
            velocityRef.current.x = (velocityRef.current.x / speed) * 2;
            velocityRef.current.y = (velocityRef.current.y / speed) * 2;
          }
        }

        // Apply friction
        velocityRef.current.x *= 0.95;
        velocityRef.current.y *= 0.95;

        let newX = prev.x + velocityRef.current.x;
        let newY = prev.y + velocityRef.current.y;

        // Boundary wrapping
        if (newX < -20) newX = window.innerWidth + 20;
        if (newX > window.innerWidth + 20) newX = -20;
        if (newY < -20) newY = window.innerHeight + 20;
        if (newY > window.innerHeight + 20) newY = -20;

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
  }, [cursorPosition, isEvading]);

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute w-8 h-8 rounded-full"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(255, 232, 124, ${glowIntensity * 0.6}) 0%, rgba(255, 191, 0, ${glowIntensity * 0.3}) 40%, transparent 70%)`,
          filter: 'blur(4px)',
          transition: 'opacity 0.3s ease',
        }}
      />
      
      {/* Core glow */}
      <div
        className="absolute w-4 h-4 rounded-full"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(255, 248, 200, ${glowIntensity}) 0%, rgba(255, 232, 124, ${glowIntensity * 0.8}) 50%, transparent 100%)`,
          boxShadow: `0 0 ${10 + glowIntensity * 10}px ${5 + glowIntensity * 5}px rgba(255, 232, 124, ${glowIntensity * 0.5})`,
          transition: 'box-shadow 0.3s ease',
        }}
      />

      {/* Firefly body */}
      <div
        className={cn(
          "relative w-2 h-3 rounded-full",
          "bg-gradient-to-b from-amber-700 to-amber-900"
        )}
        style={{
          boxShadow: `0 0 ${8 * glowIntensity}px rgba(255, 232, 124, ${glowIntensity})`,
        }}
      />

      {/* Trail */}
      {isEvading && (
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-sparkle-fade"
              style={{
                left: `${-i * 8}px`,
                top: `${(Math.random() - 0.5) * 10}px`,
                background: `rgba(255, 232, 124, ${0.8 - i * 0.15})`,
                boxShadow: `0 0 4px rgba(255, 232, 124, ${0.6 - i * 0.1})`,
                animationDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
