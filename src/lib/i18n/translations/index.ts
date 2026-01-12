import type { LanguageCode, Translations } from '../types';
import { en } from './en';
import { de } from './de';
import { ar } from './ar';
import { fr } from './fr';
import { es } from './es';

export const translations: Record<LanguageCode, Translations> = {
  en,
  de,
  ar,
  fr,
  es,
};

export { en, de, ar, fr, es };
