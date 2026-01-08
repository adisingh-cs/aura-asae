import { useEffect, useState, useRef, useCallback } from 'react';
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

// Landing spots - elements butterflies can land on
const LANDING_SELECTORS = [
  '[data-landing-spot]',
  '.card-product',
  '.trust-badge',
  '#products h2',
  '#about h2',
];

export function Butterfly({ id, color, size, initialX, initialY, cursorPosition }: ButterflyProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isEvading, setIsEvading] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [isLanding, setIsLanding] = useState(false);
  const velocityRef = useRef({ x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 });
  const animationFrameRef = useRef<number>();
  const targetRef = useRef({ x: initialX, y: initialY });
  const landingSpotRef = useRef<{ x: number; y: number } | null>(null);
  const restingTimeoutRef = useRef<NodeJS.Timeout>();

  // Find a random landing spot
  const findLandingSpot = useCallback(() => {
    const elements: Element[] = [];
    LANDING_SELECTORS.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => elements.push(el));
    });
    
    if (elements.length === 0) return null;
    
    const element = elements[Math.floor(Math.random() * elements.length)];
    const rect = element.getBoundingClientRect();
    
    // Land on top edge of element
    return {
      x: rect.left + Math.random() * rect.width,
      y: rect.top + Math.random() * 20,
    };
  }, []);

  // Start landing on an element
  const startLanding = useCallback(() => {
    const spot = findLandingSpot();
    if (spot) {
      landingSpotRef.current = spot;
      setIsLanding(true);
    }
  }, [findLandingSpot]);

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        const dx = cursorPosition.x - prev.x;
        const dy = cursorPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If cursor gets close while resting, fly away
        if ((isResting || isLanding) && distance < 120) {
          setIsResting(false);
          setIsLanding(false);
          landingSpotRef.current = null;
          if (restingTimeoutRef.current) {
            clearTimeout(restingTimeoutRef.current);
          }
          const escapeX = -dx / distance * 10;
          const escapeY = -dy / distance * 10;
          velocityRef.current = { x: escapeX, y: escapeY };
          setIsEvading(true);
          return prev;
        }

        // Evade cursor if too close while flying
        if (distance < 150 && !isResting && !isLanding) {
          setIsEvading(true);
          const escapeX = -dx / distance * 8;
          const escapeY = -dy / distance * 8;
          velocityRef.current = { x: escapeX, y: escapeY };
        } else if (isEvading && distance > 200) {
          setIsEvading(false);
        }

        // If landing, move toward landing spot
        if (isLanding && landingSpotRef.current) {
          const lx = landingSpotRef.current.x - prev.x;
          const ly = landingSpotRef.current.y - prev.y;
          const landDist = Math.sqrt(lx * lx + ly * ly);
          
          if (landDist < 5) {
            // Arrived at landing spot, start resting
            setIsLanding(false);
            setIsResting(true);
            velocityRef.current = { x: 0, y: 0 };
            
            // Rest for 3-6 seconds then fly away
            restingTimeoutRef.current = setTimeout(() => {
              setIsResting(false);
              landingSpotRef.current = null;
              velocityRef.current = { 
                x: (Math.random() - 0.5) * 4, 
                y: -Math.random() * 3 - 1 
              };
            }, 3000 + Math.random() * 3000);
            
            return { x: landingSpotRef.current.x, y: landingSpotRef.current.y };
          }
          
          velocityRef.current.x = (lx / landDist) * 2;
          velocityRef.current.y = (ly / landDist) * 2;
        }

        // Random target movement when not evading or landing
        if (!isEvading && !isResting && !isLanding) {
          // Random chance to start landing
          if (Math.random() < 0.0008) {
            startLanding();
          }
          
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

        if (isResting) {
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
      if (restingTimeoutRef.current) {
        clearTimeout(restingTimeoutRef.current);
      }
    };
  }, [cursorPosition, id, isEvading, isResting, isLanding, startLanding]);

  const rotation = isResting ? 0 : Math.atan2(velocityRef.current.y, velocityRef.current.x) * (180 / Math.PI);

  return (
    <div
      className={cn(
        "absolute pointer-events-none transition-all duration-300",
        sizeClasses[size],
        isEvading && "scale-110",
        isResting && "scale-100"
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
          className="origin-center"
          style={{ 
            animationDelay: `${id * 100}ms`,
            animation: isResting 
              ? 'wing-rest 2s ease-in-out infinite' 
              : 'wing-flap 0.15s ease-in-out infinite'
          }}
        />
        {/* Right wing */}
        <ellipse
          cx="65"
          cy="40"
          rx="30"
          ry="35"
          className="origin-center"
          style={{ 
            animationDelay: `${id * 100}ms`,
            animation: isResting 
              ? 'wing-rest-reverse 2s ease-in-out infinite' 
              : 'wing-flap-reverse 0.15s ease-in-out infinite'
          }}
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

      {/* Sparkle trail - only when flying */}
      {!isResting && !isLanding && (
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
