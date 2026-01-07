import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        "relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
        "bg-secondary hover:bg-secondary/80",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun className={cn(
        "absolute w-5 h-5 transition-all duration-300",
        isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100 text-amber-500"
      )} />
      <Moon className={cn(
        "absolute w-5 h-5 transition-all duration-300",
        isDark ? "opacity-100 rotate-0 scale-100 text-primary" : "opacity-0 -rotate-90 scale-0"
      )} />
    </button>
  );
}
