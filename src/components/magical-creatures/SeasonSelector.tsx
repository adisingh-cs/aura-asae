import { useState } from 'react';
import { Flower2, Sun, Leaf, Snowflake } from 'lucide-react';
import { useSeason, Season } from '@/contexts/SeasonContext';
import { cn } from '@/lib/utils';
const seasons: {
  id: Season;
  icon: typeof Flower2;
  label: string;
  color: string;
}[] = [{
  id: 'spring',
  icon: Flower2,
  label: 'Spring',
  color: 'text-pink-400'
}, {
  id: 'summer',
  icon: Sun,
  label: 'Summer',
  color: 'text-amber-400'
}, {
  id: 'autumn',
  icon: Leaf,
  label: 'Autumn',
  color: 'text-orange-500'
}, {
  id: 'winter',
  icon: Snowflake,
  label: 'Winter',
  color: 'text-sky-300'
}];
export function SeasonSelector() {
  const {
    season,
    setSeason
  } = useSeason();
  const [isOpen, setIsOpen] = useState(false);
  const currentSeason = seasons.find(s => s.id === season) || seasons[0];
  const CurrentIcon = currentSeason.icon;
  return;
}