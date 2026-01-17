import { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';

interface SaleBannerProps {
  endDate?: Date;
}

export function SaleBanner({ endDate = new Date('2025-02-14T23:59:59') }: SaleBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = endDate.getTime();
      const difference = end - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white py-2 px-4 relative z-50">
      <div className="container mx-auto flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
        <Heart className="w-4 h-4 animate-pulse fill-white" />
        <span className="hidden sm:inline">💝 Early Valentine's Day Sale!</span>
        <span className="sm:hidden">💝 Valentine Sale!</span>
        <span className="font-bold">Get 20% OFF</span>
        <span className="hidden md:inline">with code</span>
        <span className="bg-white/20 px-2 py-0.5 rounded font-mono font-bold">LOVE20</span>
        <span className="hidden lg:flex items-center gap-2">
          <span>|</span>
          <span>Ends in:</span>
          <span className="font-mono bg-white/20 px-2 py-0.5 rounded">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
          </span>
        </span>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 hover:bg-white/20 p-1 rounded-full transition-colors"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
