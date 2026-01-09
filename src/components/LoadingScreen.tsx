import { useState, useEffect } from 'react';
import auraLogo from '@/assets/aura-logo.png';

interface LoadingButterflyProps {
  delay: number;
  startX: number;
  startY: number;
  color: string;
}

const LoadingButterfly = ({ delay, startX, startY, color }: LoadingButterflyProps) => {
  return (
    <div
      className="absolute animate-butterfly-float"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        animationDelay: `${delay}s`,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 40 40"
        className="drop-shadow-sm"
      >
        {/* Left wing */}
        <ellipse
          cx="12"
          cy="20"
          rx="10"
          ry="8"
          fill={color}
          opacity="0.9"
          className="origin-right animate-wing-flap"
        />
        {/* Right wing */}
        <ellipse
          cx="28"
          cy="20"
          rx="10"
          ry="8"
          fill={color}
          opacity="0.9"
          className="origin-left animate-wing-flap-reverse"
        />
        {/* Body */}
        <ellipse cx="20" cy="20" rx="2" ry="6" fill="hsl(var(--foreground))" opacity="0.6" />
        {/* Antennae */}
        <path d="M19 14 Q17 10 15 8" stroke="hsl(var(--foreground))" strokeWidth="0.5" fill="none" opacity="0.6" />
        <path d="M21 14 Q23 10 25 8" stroke="hsl(var(--foreground))" strokeWidth="0.5" fill="none" opacity="0.6" />
      </svg>
    </div>
  );
};

const LoadingPetal = ({ delay, startX }: { delay: number; startX: number }) => {
  return (
    <div
      className="absolute animate-float-slow opacity-70"
      style={{
        left: `${startX}%`,
        top: '20%',
        animationDelay: `${delay}s`,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 20 20">
        <ellipse
          cx="10"
          cy="10"
          rx="8"
          ry="5"
          fill="hsl(var(--aura-rose))"
          opacity="0.7"
          transform="rotate(45 10 10)"
        />
      </svg>
    </div>
  );
};

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Remove loading screen after fade animation
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  const butterflies = [
    { delay: 0, startX: 20, startY: 30, color: 'hsl(var(--aura-lavender))' },
    { delay: 0.3, startX: 75, startY: 25, color: 'hsl(var(--aura-rose))' },
    { delay: 0.6, startX: 15, startY: 60, color: 'hsl(var(--primary))' },
    { delay: 0.9, startX: 80, startY: 55, color: 'hsl(var(--aura-lavender-light))' },
    { delay: 1.2, startX: 50, startY: 70, color: 'hsl(var(--aura-rose))' },
  ];

  const petals = [
    { delay: 0, startX: 30 },
    { delay: 0.5, startX: 60 },
    { delay: 1, startX: 45 },
    { delay: 1.5, startX: 70 },
    { delay: 0.8, startX: 25 },
  ];

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Floating petals */}
      {petals.map((petal, index) => (
        <LoadingPetal key={`petal-${index}`} {...petal} />
      ))}

      {/* Butterflies */}
      {butterflies.map((butterfly, index) => (
        <LoadingButterfly key={`butterfly-${index}`} {...butterfly} />
      ))}

      {/* Center content */}
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        {/* Logo with pulse */}
        <div className="relative">
          <img
            src={auraLogo}
            alt="Aura"
            className="w-40 h-40 md:w-56 md:h-56 object-contain animate-pulse"
          />
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-150 animate-pulse" />
        </div>

        {/* Brand name */}
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
          AURA
        </h1>

        {/* Tagline */}
        <p className="text-muted-foreground text-sm animate-pulse">
          Glow with the Flow ✨
        </p>

        {/* Loading dots */}
        <div className="flex gap-1 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
