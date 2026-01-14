import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { localeConfigs } from '@/lib/i18n/locales';
import type { CountryCode } from '@/lib/i18n/types';
import Index from './Index';

const countryRouteMap: Record<string, CountryCode> = {
  'us': 'US',
  'uk': 'UK',
  'de': 'DE',
  'fr': 'FR',
  'es': 'ES',
  'ae': 'AE',
  'in': 'IN',
};

const CountryLanding = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const { setCountry, t, currentLocale } = useLocale();

  const mappedCountry = countryCode ? countryRouteMap[countryCode.toLowerCase()] : null;

  useEffect(() => {
    if (mappedCountry) {
      setCountry(mappedCountry);
    }
  }, [mappedCountry, setCountry]);

  if (!mappedCountry) {
    return <Navigate to="/" replace />;
  }

  const config = localeConfigs[mappedCountry];
  const baseUrl = 'https://auracosmetics.in';
  const canonicalUrl = `${baseUrl}/${countryCode?.toLowerCase()}`;

  const allCountries = Object.keys(countryRouteMap);

  return (
    <>
      <Helmet>
        <title>{t.seo?.title || 'Aura Cosmetics | Organic Handcrafted Facewash'}</title>
        <meta name="description" content={t.seo?.description || "Shop Aura's 100% organic, handcrafted facewash collection."} />
        <meta name="keywords" content={t.seo?.keywords || 'organic facewash, natural skincare'} />
        
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang tags for international SEO */}
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
        {allCountries.map((code) => {
          const countryKey = countryRouteMap[code];
          const localeConfig = localeConfigs[countryKey];
          return (
            <link 
              key={code}
              rel="alternate" 
              hrefLang={localeConfig.language} 
              href={`${baseUrl}/${code}`} 
            />
          );
        })}
        
        <meta property="og:locale" content={t.seo?.ogLocale || 'en_US'} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={t.seo?.title || 'Aura Cosmetics'} />
        <meta property="og:description" content={t.seo?.description || ''} />
        
        <html lang={config.language} dir={config.isRTL ? 'rtl' : 'ltr'} />
      </Helmet>
      
      <Index />
    </>
  );
};

export default CountryLanding;