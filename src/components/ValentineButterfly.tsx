import { useState, useEffect, useCallback, useRef } from 'react';
import { Heart, Sparkles, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface SparkleType {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
  rotation: number;
}

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  size: number;
  type: 'heart' | 'sparkle' | 'star';
  color: string;
}

export function ValentineButterfly() {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [isFlying, setIsFlying] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sparkles, setSparkles] = useState<SparkleType[]>([]);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
  
  const animationRef = useRef<number | null>(null);
  const confettiRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const basePositionRef = useRef({ x: 200, y: 200 });
  const targetRef = useRef({ x: 300, y: 300 });
  const lastSparkleTimeRef = useRef(0);

  // Confetti burst effect
  const triggerConfetti = useCallback((originX: number, originY: number) => {
    const particles: ConfettiParticle[] = [];
    const colors = ['#ef4444', '#f43f5e', '#ec4899', '#fbbf24', '#f59e0b', '#fcd34d'];
    const types: ('heart' | 'sparkle' | 'star')[] = ['heart', 'sparkle', 'star'];
    
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50 + Math.random() * 0.5;
      const velocity = 8 + Math.random() * 12;
      
      particles.push({
        id: Date.now() + i,
        x: originX,
        y: originY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20,
        opacity: 1,
        size: 12 + Math.random() * 16,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    setConfetti(particles);
  }, []);

  // Animate confetti
  useEffect(() => {
    if (confetti.length === 0) return;

    const animateConfetti = () => {
      setConfetti(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.4, // gravity
            vx: p.vx * 0.99, // air resistance
            rotation: p.rotation + p.rotationSpeed,
            opacity: p.opacity - 0.015,
          }))
          .filter(p => p.opacity > 0 && p.y < window.innerHeight + 100)
      );
      
      confettiRef.current = requestAnimationFrame(animateConfetti);
    };

    confettiRef.current = requestAnimationFrame(animateConfetti);

    return () => {
      if (confettiRef.current) {
        cancelAnimationFrame(confettiRef.current);
      }
    };
  }, [confetti.length > 0]);

  // Smooth Perlin-like movement using layered sine waves
  useEffect(() => {
    if (!isFlying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = (timestamp: number) => {
      timeRef.current = timestamp * 0.0003; // Slow time progression
      
      const time = timeRef.current;
      
      // Layered sine waves for organic movement
      const noiseX = 
        Math.sin(time * 0.7) * 80 +
        Math.sin(time * 1.3 + 0.5) * 40 +
        Math.sin(time * 2.1 + 1.2) * 20;
      
      const noiseY = 
        Math.cos(time * 0.5) * 60 +
        Math.cos(time * 1.1 + 0.8) * 35 +
        Math.sin(time * 1.7 + 2.1) * 18;
      
      // Slowly drifting base position
      basePositionRef.current.x += (targetRef.current.x - basePositionRef.current.x) * 0.002;
      basePositionRef.current.y += (targetRef.current.y - basePositionRef.current.y) * 0.002;
      
      // Change target occasionally
      if (Math.random() < 0.003) {
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
        const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
        targetRef.current = {
          x: 100 + Math.random() * (viewportWidth - 200),
          y: 100 + Math.random() * (viewportHeight - 300),
        };
      }
      
      // Calculate final position
      let newX = basePositionRef.current.x + noiseX;
      let newY = basePositionRef.current.y + noiseY;
      
      // Keep within bounds with soft bounce
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
      
      newX = Math.max(50, Math.min(viewportWidth - 80, newX));
      newY = Math.max(80, Math.min(viewportHeight - 120, newY));
      
      setPosition({ x: newX, y: newY });
      
      // Add sparkles at intervals
      if (timestamp - lastSparkleTimeRef.current > 80) {
        lastSparkleTimeRef.current = timestamp;
        
        const newSparkle: SparkleType = {
          id: timestamp,
          x: newX + (Math.random() - 0.5) * 30,
          y: newY + (Math.random() - 0.5) * 30 + 20,
          opacity: 1,
          size: 8 + Math.random() * 10,
          rotation: Math.random() * 360,
        };
        
        setSparkles(prev => [...prev.slice(-20), newSparkle]);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize base position
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    basePositionRef.current = { 
      x: viewportWidth * 0.3, 
      y: viewportHeight * 0.3 
    };
    targetRef.current = { 
      x: viewportWidth * 0.6, 
      y: viewportHeight * 0.4 
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isFlying]);

  // Fade out sparkles
  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setSparkles(prev => 
        prev
          .map(s => ({ ...s, opacity: s.opacity - 0.04, rotation: s.rotation + 2 }))
          .filter(s => s.opacity > 0)
      );
    }, 50);

    return () => clearInterval(fadeInterval);
  }, []);

  const handleButterflyClick = () => {
    // Trigger confetti burst at butterfly position
    triggerConfetti(position.x, position.y);
    setIsFlying(false);
    setShowPopup(true);
  };

  const handleCopyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('YOURAURA++');
      setCopied(true);
      toast.success('Code copied to clipboard!');
      
      setTimeout(() => {
        setShowPopup(false);
        setCopied(false);
        
        // Scroll to products section
        const productsSection = document.getElementById('products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 800);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsFlying(true);
  };

  // Render confetti particle based on type
  const renderConfettiParticle = (particle: ConfettiParticle) => {
    if (particle.type === 'heart') {
      return (
        <svg width={particle.size} height={particle.size} viewBox="0 0 24 24" fill={particle.color}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    } else if (particle.type === 'star') {
      return (
        <svg width={particle.size} height={particle.size} viewBox="0 0 24 24" fill={particle.color}>
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
        </svg>
      );
    } else {
      return (
        <svg width={particle.size} height={particle.size} viewBox="0 0 24 24" fill={particle.color}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    }
  };

  return (
    <>
      {/* Confetti Burst */}
      {confetti.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[55]"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
          }}
        >
          {renderConfettiParticle(particle)}
        </div>
      ))}

      {/* Golden Sparkle Trail */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            opacity: sparkle.opacity,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg)`,
          }}
        >
          <svg 
            width={sparkle.size} 
            height={sparkle.size} 
            viewBox="0 0 24 24"
            style={{ filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.9))' }}
          >
            <defs>
              <radialGradient id={`sparkleGrad-${sparkle.id}`} cx="50%" cy="50%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
            </defs>
            {/* 4-pointed star */}
            <path 
              d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
              fill={`url(#sparkleGrad-${sparkle.id})`}
            />
          </svg>
        </div>
      ))}

      {/* Flying Butterfly */}
      {isFlying && (
        <button
          onClick={handleButterflyClick}
          className="fixed z-[45] cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -50%)',
          }}
          aria-label="Click for a special surprise"
        >
          <div className="relative">
            {/* Glow aura */}
            <div 
              className="absolute inset-0 rounded-full blur-2xl animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)',
                width: '80px',
                height: '80px',
                left: '-16px',
                top: '-16px',
              }}
            />
            
            {/* Main Butterfly SVG */}
            <svg 
              width="56" 
              height="56" 
              viewBox="0 0 56 56" 
              className="drop-shadow-[0_0_15px_rgba(239,68,68,0.7)]"
              style={{ filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))' }}
            >
              <defs>
                {/* Wing gradient */}
                <radialGradient id="wingGradient" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="40%" stopColor="#ef4444" />
                  <stop offset="80%" stopColor="#b91c1c" />
                  <stop offset="100%" stopColor="#7f1d1d" />
                </radialGradient>
                
                {/* Inner wing glow */}
                <radialGradient id="innerGlow" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                
                {/* Shimmer effect */}
                <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              
              {/* Left Upper Wing */}
              <ellipse 
                cx="15" 
                cy="22" 
                rx="13" 
                ry="18" 
                fill="url(#wingGradient)"
                className="origin-[28px_28px]"
                style={{ animation: 'wingFlap 0.25s ease-in-out infinite' }}
              />
              
              {/* Left Lower Wing */}
              <ellipse 
                cx="14" 
                cy="36" 
                rx="10" 
                ry="12" 
                fill="url(#wingGradient)"
                className="origin-[28px_28px]"
                style={{ animation: 'wingFlap 0.25s ease-in-out infinite' }}
              />
              
              {/* Right Upper Wing */}
              <ellipse 
                cx="41" 
                cy="22" 
                rx="13" 
                ry="18" 
                fill="url(#wingGradient)"
                className="origin-[28px_28px]"
                style={{ animation: 'wingFlapReverse 0.25s ease-in-out infinite' }}
              />
              
              {/* Right Lower Wing */}
              <ellipse 
                cx="42" 
                cy="36" 
                rx="10" 
                ry="12" 
                fill="url(#wingGradient)"
                className="origin-[28px_28px]"
                style={{ animation: 'wingFlapReverse 0.25s ease-in-out infinite' }}
              />
              
              {/* Wing decorative patterns */}
              <circle cx="12" cy="18" r="4" fill="rgba(255,255,255,0.35)" />
              <circle cx="44" cy="18" r="4" fill="rgba(255,255,255,0.35)" />
              <circle cx="10" cy="26" r="2.5" fill="rgba(255,255,255,0.25)" />
              <circle cx="46" cy="26" r="2.5" fill="rgba(255,255,255,0.25)" />
              <circle cx="14" cy="32" r="2" fill="rgba(255,200,200,0.4)" />
              <circle cx="42" cy="32" r="2" fill="rgba(255,200,200,0.4)" />
              <circle cx="12" cy="38" r="1.5" fill="rgba(255,255,255,0.3)" />
              <circle cx="44" cy="38" r="1.5" fill="rgba(255,255,255,0.3)" />
              
              {/* Wing veins */}
              <path d="M28 28 Q18 20 8 20" stroke="rgba(127,29,29,0.3)" strokeWidth="0.8" fill="none" />
              <path d="M28 28 Q38 20 48 20" stroke="rgba(127,29,29,0.3)" strokeWidth="0.8" fill="none" />
              <path d="M28 28 Q16 32 10 40" stroke="rgba(127,29,29,0.3)" strokeWidth="0.6" fill="none" />
              <path d="M28 28 Q40 32 46 40" stroke="rgba(127,29,29,0.3)" strokeWidth="0.6" fill="none" />
              
              {/* Body */}
              <ellipse cx="28" cy="28" rx="3.5" ry="14" fill="#4c0519" />
              <ellipse cx="28" cy="28" rx="2.5" ry="12" fill="#7f1d1d" />
              
              {/* Body segments */}
              <circle cx="28" cy="18" r="1.5" fill="#4c0519" />
              <circle cx="28" cy="22" r="1.2" fill="#4c0519" />
              <circle cx="28" cy="26" r="1.2" fill="#4c0519" />
              <circle cx="28" cy="30" r="1.2" fill="#4c0519" />
              <circle cx="28" cy="34" r="1.2" fill="#4c0519" />
              <circle cx="28" cy="38" r="1" fill="#4c0519" />
              
              {/* Antennae */}
              <path d="M28 14 Q24 8 22 4" stroke="#4c0519" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M28 14 Q32 8 34 4" stroke="#4c0519" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <circle cx="22" cy="4" r="2" fill="#b91c1c" />
              <circle cx="34" cy="4" r="2" fill="#b91c1c" />
              
              {/* Shimmer overlay */}
              <ellipse cx="12" cy="20" rx="6" ry="10" fill="url(#shimmer)" opacity="0.5" />
              <ellipse cx="44" cy="20" rx="6" ry="10" fill="url(#shimmer)" opacity="0.5" />
            </svg>
          </div>
        </button>
      )}

      {/* Special Offer Popup */}
      <Dialog open={showPopup} onOpenChange={handleClosePopup}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 border-2 border-rose-200 z-[60]">
          <div className="relative text-center py-4">
            {/* Decorative hearts */}
            <div className="absolute -top-2 left-4 animate-bounce">
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
            </div>
            <div className="absolute -top-1 right-6 animate-bounce" style={{ animationDelay: '0.2s' }}>
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            </div>
            <div className="absolute top-8 -right-1 animate-bounce" style={{ animationDelay: '0.4s' }}>
              <Heart className="w-5 h-5 text-red-400 fill-red-400" />
            </div>

            {/* Sparkle decorations */}
            <Sparkles className="absolute top-2 left-1/4 w-4 h-4 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute bottom-4 right-1/4 w-5 h-5 text-yellow-500 animate-pulse" style={{ animationDelay: '0.3s' }} />

            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-rose-500 to-red-500 p-3 rounded-full">
                  <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
                </div>
              </div>

              <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                You've Unlocked a Valentine's Special Offer! 💝
              </h2>

              <p className="text-muted-foreground">
                Use this exclusive code while placing your order:
              </p>

              <button
                onClick={handleCopyCode}
                className="group relative mx-auto flex items-center gap-2 bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-mono text-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span className="tracking-wider">YOURAURA++</span>
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5 group-hover:animate-bounce" />
                )}
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <p className="text-sm text-muted-foreground">
                Click the code to copy & start shopping! ✨
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom animation styles */}
      <style>{`
        @keyframes wingFlap {
          0%, 100% { transform: scaleX(1) rotateY(0deg); }
          50% { transform: scaleX(0.6) rotateY(20deg); }
        }
        @keyframes wingFlapReverse {
          0%, 100% { transform: scaleX(1) rotateY(0deg); }
          50% { transform: scaleX(0.6) rotateY(-20deg); }
        }
      `}</style>
    </>
  );
}