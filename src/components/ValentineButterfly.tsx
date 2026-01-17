import { useState, useEffect, useCallback } from 'react';
import { X, Heart, Sparkles, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from 'sonner';

export function ValentineButterfly() {
  const [position, setPosition] = useState({ x: 20, y: 30 });
  const [isFlying, setIsFlying] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; opacity: number }[]>([]);

  // Generate random flight path
  useEffect(() => {
    if (!isFlying) return;

    const flyInterval = setInterval(() => {
      setPosition(prev => {
        const newX = prev.x + (Math.random() - 0.5) * 15;
        const newY = prev.y + (Math.random() - 0.5) * 10;
        
        // Keep butterfly within bounds
        const boundedX = Math.max(5, Math.min(90, newX));
        const boundedY = Math.max(10, Math.min(80, newY));
        
        return { x: boundedX, y: boundedY };
      });
    }, 2000);

    return () => clearInterval(flyInterval);
  }, [isFlying]);

  // Create sparkle trail
  useEffect(() => {
    if (!isFlying) return;

    const sparkleInterval = setInterval(() => {
      const newSparkle = {
        id: Date.now(),
        x: position.x + (Math.random() - 0.5) * 5,
        y: position.y + (Math.random() - 0.5) * 5,
        opacity: 1,
      };

      setSparkles(prev => [...prev.slice(-15), newSparkle]);
    }, 150);

    return () => clearInterval(sparkleInterval);
  }, [isFlying, position]);

  // Fade out sparkles
  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setSparkles(prev => 
        prev
          .map(s => ({ ...s, opacity: s.opacity - 0.1 }))
          .filter(s => s.opacity > 0)
      );
    }, 100);

    return () => clearInterval(fadeInterval);
  }, []);

  const handleButterflyClick = () => {
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

  return (
    <>
      {/* Sparkle Trail */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            opacity: sparkle.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Sparkles 
            className="w-3 h-3 text-yellow-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" 
            style={{ 
              filter: 'drop-shadow(0 0 4px gold)',
              animation: 'pulse 0.5s ease-in-out infinite'
            }}
          />
        </div>
      ))}

      {/* Flying Butterfly */}
      {isFlying && (
        <button
          onClick={handleButterflyClick}
          className="fixed z-50 cursor-pointer transition-all duration-[2000ms] ease-in-out hover:scale-125"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          aria-label="Click for a special surprise"
        >
          <div className="relative animate-bounce">
            {/* Butterfly Body */}
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              className="drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]"
            >
              {/* Left Wing */}
              <ellipse 
                cx="14" 
                cy="24" 
                rx="12" 
                ry="16" 
                fill="url(#redGradient)"
                className="origin-right animate-[wingFlap_0.3s_ease-in-out_infinite]"
              />
              {/* Right Wing */}
              <ellipse 
                cx="34" 
                cy="24" 
                rx="12" 
                ry="16" 
                fill="url(#redGradient)"
                className="origin-left animate-[wingFlap_0.3s_ease-in-out_infinite_reverse]"
              />
              {/* Wing Decorations */}
              <circle cx="10" cy="20" r="3" fill="rgba(255,255,255,0.4)" />
              <circle cx="38" cy="20" r="3" fill="rgba(255,255,255,0.4)" />
              <circle cx="12" cy="28" r="2" fill="rgba(255,255,255,0.3)" />
              <circle cx="36" cy="28" r="2" fill="rgba(255,255,255,0.3)" />
              {/* Body */}
              <ellipse cx="24" cy="24" rx="3" ry="12" fill="#7f1d1d" />
              {/* Antennae */}
              <line x1="24" y1="12" x2="20" y2="6" stroke="#7f1d1d" strokeWidth="1.5" />
              <line x1="24" y1="12" x2="28" y2="6" stroke="#7f1d1d" strokeWidth="1.5" />
              <circle cx="20" cy="5" r="1.5" fill="#7f1d1d" />
              <circle cx="28" cy="5" r="1.5" fill="#7f1d1d" />
              {/* Gradient Definition */}
              <defs>
                <radialGradient id="redGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#b91c1c" />
                </radialGradient>
              </defs>
            </svg>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
          </div>
        </button>
      )}

      {/* Special Offer Popup */}
      <Dialog open={showPopup} onOpenChange={handleClosePopup}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 border-2 border-rose-200">
          <div className="relative text-center py-4">
            {/* Decorative hearts */}
            <div className="absolute -top-2 left-4 animate-bounce">
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
            </div>
            <div className="absolute -top-1 right-6 animate-bounce animation-delay-200">
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            </div>
            <div className="absolute top-8 -right-1 animate-bounce animation-delay-400">
              <Heart className="w-5 h-5 text-red-400 fill-red-400" />
            </div>

            {/* Sparkle decorations */}
            <Sparkles className="absolute top-2 left-1/4 w-4 h-4 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute bottom-4 right-1/4 w-5 h-5 text-yellow-500 animate-pulse animation-delay-300" />

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
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.7); }
        }
      `}</style>
    </>
  );
}
