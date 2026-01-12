import { ChevronDown } from 'lucide-react';
import { useLocale, supportedCountries } from '@/lib/i18n/LocaleContext';
import type { CountryCode } from '@/lib/i18n/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface CountrySelectorProps {
  className?: string;
  variant?: 'navbar' | 'mobile';
}

export function CountrySelector({ className, variant = 'navbar' }: CountrySelectorProps) {
  const { currentLocale, setCountry, isRTL } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className={cn(
          "flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors",
          "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20",
          variant === 'mobile' && "w-full justify-between py-3",
          className
        )}
        aria-label="Select country and language"
      >
        <span className="text-lg">{currentLocale.flag}</span>
        <span className={cn(
          "text-sm font-medium text-foreground",
          variant === 'mobile' && "flex-1 text-left mx-2"
        )}>
          {currentLocale.currency}
        </span>
        <ChevronDown className={cn(
          "w-3.5 h-3.5 text-muted-foreground transition-transform",
          isRTL && "rotate-180"
        )} />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align={isRTL ? "start" : "end"} 
        className="w-56 bg-background border border-border shadow-lg z-50"
      >
        {supportedCountries.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => setCountry(locale.code as CountryCode)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 cursor-pointer",
              "hover:bg-muted focus:bg-muted",
              currentLocale.code === locale.code && "bg-primary/10"
            )}
          >
            <span className="text-xl">{locale.flag}</span>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">
                {locale.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {locale.languageName} • {locale.symbol}{locale.productPrice}
              </div>
            </div>
            {currentLocale.code === locale.code && (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
