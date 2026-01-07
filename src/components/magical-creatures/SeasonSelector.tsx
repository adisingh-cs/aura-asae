import { useState } from 'react';
import { Flower2, Sun, Leaf, Snowflake } from 'lucide-react';
import { useSeason, Season } from '@/contexts/SeasonContext';
import { cn } from '@/lib/utils';

const seasons: { id: Season; icon: typeof Flower2; label: string; color: string }[] = [
  { id: 'spring', icon: Flower2, label: 'Spring', color: 'text-pink-400' },
  { id: 'summer', icon: Sun, label: 'Summer', color: 'text-amber-400' },
  { id: 'autumn', icon: Leaf, label: 'Autumn', color: 'text-orange-500' },
  { id: 'winter', icon: Snowflake, label: 'Winter', color: 'text-sky-300' },
];

export function SeasonSelector() {
  const { season, setSeason } = useSeason();
  const [isOpen, setIsOpen] = useState(false);

  const currentSeason = seasons.find(s => s.id === season) || seasons[0];
  const CurrentIcon = currentSeason.icon;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className={cn(
        "absolute bottom-14 left-0 flex flex-col gap-2 transition-all duration-300",
        isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4"
      )}>
        {seasons.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => {
                setSeason(s.id);
                setIsOpen(false);
              }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                "bg-card shadow-lg hover:scale-110",
                season === s.id && "ring-2 ring-primary"
              )}
              aria-label={`Set season to ${s.label}`}
            >
              <Icon className={cn("w-5 h-5", s.color)} />
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
          "bg-card shadow-lg hover:scale-105",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isOpen && "rotate-180"
        )}
        aria-label="Toggle season selector"
      >
        <CurrentIcon className={cn("w-6 h-6 transition-transform", currentSeason.color)} />
      </button>
    </div>
  );
}
