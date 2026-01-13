export type CountryCode = 'IN' | 'US' | 'GB' | 'CA' | 'AU' | 'DE' | 'AE' | 'SG' | 'FR' | 'ES';
export type LanguageCode = 'en' | 'de' | 'ar' | 'fr' | 'es';

export interface ProductTranslation {
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  suitableFor: string[];
  keyIngredient: string;
}

export interface TestimonialTranslation {
  text: string;
}

export interface LocaleConfig {
  code: CountryCode;
  name: string;
  flag: string;
  language: LanguageCode;
  languageName: string;
  currency: string;
  symbol: string;
  productPrice: number;
  shippingCost: number;
  freeShippingThreshold?: number;
  comboPrice?: number;
  hasOffers: boolean;
  isRTL?: boolean;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
  ogLocale: string;
}

export interface Translations {
  // SEO
  seo: SEOMetadata;
  
  // Navigation
  nav: {
    about: string;
    products: string;
    ingredients: string;
    reviews: string;
    contact: string;
  };
  
  // Hero Section
  hero: {
    badge: string;
    tagline: string;
    cta: string;
    secondary: string;
  };
  
  // About Section
  about: {
    label: string;
    title: string;
    titleHighlight: string;
    paragraphs: string[];
    badges: string[];
  };
  
  // Products Section
  products: {
    label: string;
    title: string;
    subtitle: string;
    priceNote: string;
    viewDetails: string;
    items: Record<string, ProductTranslation>;
  };
  
  // Trust Section
  trust: {
    label: string;
    title: string;
    subtitle: string;
    features: { title: string; description: string }[];
  };
  
  // Ingredients Section
  ingredients: {
    label: string;
    title: string;
    subtitle: string;
    items: { name: string; benefit: string }[];
  };
  
  // Testimonials Section
  testimonials: {
    label: string;
    title: string;
    subtitle: string;
    disclaimer: string;
    items: TestimonialTranslation[];
  };
  
  // FAQ Section
  faq: {
    label: string;
    title: string;
    subtitle: string;
    questions: { question: string; answer: string }[];
    promiseTitle: string;
    promiseText: string;
  };
  
  // Contact Section
  contact: {
    label: string;
    title: string;
    subtitle: string;
    whatsappCta: string;
    phone: string;
    email: string;
    instagram: string;
  };
  
  // Footer
  footer: {
    tagline: string;
    productsTitle: string;
    linksTitle: string;
    contactTitle: string;
    copyright: string;
    madeIn: string;
  };
  
  // Product Details
  productDetails: {
    benefits: string;
    suitableFor: string;
    ingredients: string;
    orderNow: string;
    shippingInfo: string;
    size: string;
  };
  
  // Promo Banner (India only)
  promo: {
    freeDelivery: string;
    limitedOffer: string;
  };
  
  // International Banner
  international: {
    shippingAvailable: string;
    shippingCost: string;
  };
}
