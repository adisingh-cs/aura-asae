import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { CountryCode, LocaleConfig, Translations } from './types';
import { locales, defaultCountry, supportedCountries } from './locales';
import { translations } from './translations';

interface LocaleContextValue {
  currentLocale: LocaleConfig;
  t: Translations;
  setCountry: (code: CountryCode) => void;
  formatPrice: (price?: number) => string;
  isIndia: boolean;
  isRTL: boolean;
  isLoading: boolean;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const STORAGE_KEY = 'aura-country';

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

      // Try IP-based detection
      try {
        const response = await fetch('https://ipapi.co/json/', { 
          signal: AbortSignal.timeout(3000) 
        });
        if (response.ok) {
          const data = await response.json();
          const detected = mapCountryCode(data.country_code);
          setCountryCode(detected);
          localStorage.setItem(STORAGE_KEY, detected);
        }
      } catch (error) {
        // Fallback to browser language
        const browserCountry = getBrowserLanguage();
        if (browserCountry) {
          setCountryCode(browserCountry);
          localStorage.setItem(STORAGE_KEY, browserCountry);
        }
      } finally {
        setIsLoading(false);
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
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

export { supportedCountries };
