import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { CountryCode, LocaleConfig, Translations } from './types';
import { locales, defaultCountry, supportedCountries } from './locales';
import { translations } from './translations';
import { toast } from 'sonner';

interface LocaleContextValue {
  currentLocale: LocaleConfig;
  t: Translations;
  setCountry: (code: CountryCode) => void;
  formatPrice: (price?: number) => string;
  isIndia: boolean;
  isRTL: boolean;
  isLoading: boolean;
}

// Create context with a default value to avoid undefined during HMR
const defaultLocale = locales[defaultCountry];
const defaultTranslations = translations[defaultLocale.language];

const LocaleContext = createContext<LocaleContextValue>({
  currentLocale: defaultLocale,
  t: defaultTranslations,
  setCountry: () => {},
  formatPrice: (price) => `${defaultLocale.symbol}${price ?? defaultLocale.productPrice}`,
  isIndia: defaultCountry === 'IN',
  isRTL: false,
  isLoading: true,
});

const STORAGE_KEY = 'aura-country';
const DETECTION_SHOWN_KEY = 'aura-detection-shown';

// Map IP API country codes to our supported countries
const mapCountryCode = (code: string): CountryCode => {
  const upperCode = code.toUpperCase();
  if (upperCode in locales) {
    return upperCode as CountryCode;
  }
  // Map EU countries to appropriate locales
  const euCountries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'SE'];
  if (euCountries.includes(upperCode)) {
    return 'DE'; // Use Germany/EUR as default for EU
  }
  return defaultCountry;
};

// Get language from browser
const getBrowserLanguage = (): CountryCode | null => {
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  const langToCountry: Record<string, CountryCode> = {
    de: 'DE',
    ar: 'AE',
    fr: 'FR',
    es: 'ES',
  };
  return langToCountry[browserLang] || null;
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountry);
  const [isLoading, setIsLoading] = useState(true);
  const hasShownToast = useRef(false);

  // Detect country on mount
  useEffect(() => {
    const detectCountry = async () => {
      // First check localStorage
      const savedCountry = localStorage.getItem(STORAGE_KEY);
      if (savedCountry && savedCountry in locales) {
        setCountryCode(savedCountry as CountryCode);
        setIsLoading(false);
        return;
      }

      // Check if we've already shown the detection toast
      const detectionShown = localStorage.getItem(DETECTION_SHOWN_KEY);
      let detectedCountry: CountryCode = defaultCountry;
      let wasAutoDetected = false;

      // Try IP-based detection
      try {
        const response = await fetch('https://ipapi.co/json/', { 
          signal: AbortSignal.timeout(3000) 
        });
        if (response.ok) {
          const data = await response.json();
          detectedCountry = mapCountryCode(data.country_code);
          wasAutoDetected = detectedCountry !== defaultCountry;
        }
      } catch (error) {
        // Fallback to browser language
        const browserCountry = getBrowserLanguage();
        if (browserCountry) {
          detectedCountry = browserCountry;
          wasAutoDetected = true;
        }
      }

      setCountryCode(detectedCountry);
      localStorage.setItem(STORAGE_KEY, detectedCountry);
      setIsLoading(false);

      // Show toast notification for first-time auto-detection (non-default country)
      if (wasAutoDetected && !detectionShown && !hasShownToast.current) {
        hasShownToast.current = true;
        localStorage.setItem(DETECTION_SHOWN_KEY, 'true');
        
        const locale = locales[detectedCountry];
        // Delay toast to ensure app is rendered
        setTimeout(() => {
          toast.info(
            `🌍 Showing content in ${locale.languageName}`,
            {
              description: `Prices in ${locale.currency} (${locale.symbol}). You can change this anytime using the flag selector.`,
              duration: 6000,
              action: {
                label: 'Got it',
                onClick: () => {},
              },
            }
          );
        }, 1500);
      }
    };

    detectCountry();
  }, []);

  // Update document direction for RTL languages
  useEffect(() => {
    const locale = locales[countryCode];
    if (locale.isRTL) {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = locale.language;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = locale.language;
    }
  }, [countryCode]);

  const setCountry = useCallback((code: CountryCode) => {
    setCountryCode(code);
    localStorage.setItem(STORAGE_KEY, code);
    
    const locale = locales[code];
    toast.success(
      `${locale.flag} Language changed to ${locale.languageName}`,
      {
        description: `Prices now shown in ${locale.currency} (${locale.symbol})`,
        duration: 3000,
      }
    );
  }, []);

  const currentLocale = useMemo(() => locales[countryCode], [countryCode]);
  const t = useMemo(() => translations[currentLocale.language], [currentLocale.language]);

  const formatPrice = useCallback((price?: number) => {
    const priceToShow = price ?? currentLocale.productPrice;
    const formattedPrice = priceToShow % 1 === 0 
      ? priceToShow.toString() 
      : priceToShow.toFixed(2);
    return `${currentLocale.symbol}${formattedPrice}`;
  }, [currentLocale]);

  const value = useMemo(() => ({
    currentLocale,
    t,
    setCountry,
    formatPrice,
    isIndia: countryCode === 'IN',
    isRTL: currentLocale.isRTL ?? false,
    isLoading,
  }), [currentLocale, t, setCountry, formatPrice, countryCode, isLoading]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  return context;
}

export { supportedCountries };
