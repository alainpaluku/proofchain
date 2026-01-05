'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { translations, Locale, TranslationKey, TranslationSubKey } from '../i18n/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: <T extends TranslationKey>(section: T, key: TranslationSubKey<T>, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'proofchain-locale';

export function LanguageProvider({ children, defaultLocale = 'fr' }: { children: ReactNode; defaultLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && (saved === 'fr' || saved === 'en')) {
      setLocaleState(saved);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang !== 'fr') {
        setLocaleState('en');
      }
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
  }, []);

  const t = useCallback(<T extends TranslationKey>(section: T, key: TranslationSubKey<T>, params?: Record<string, string | number>): string => {
    const sectionData = translations[section];
    if (!sectionData) return `${String(section)}.${String(key)}`;
    const entry = sectionData[key as keyof typeof sectionData] as { fr: string; en: string } | undefined;
    if (!entry) return `${String(section)}.${String(key)}`;
    
    let text = entry[locale] || entry.fr;
    
    if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
            text = text.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue));
        });
    }
    
    return text;
  }, [locale]);

  if (!mounted) {
    // SSR: return default locale translations
    const ssrT = <T extends TranslationKey>(section: T, key: TranslationSubKey<T>, params?: Record<string, string | number>): string => {
      const sectionData = translations[section];
      if (!sectionData) return `${String(section)}.${String(key)}`;
      const entry = sectionData[key as keyof typeof sectionData] as { fr: string; en: string } | undefined;
      if (!entry) return `${String(section)}.${String(key)}`;
      
      let text = entry[defaultLocale] || entry.fr;
      
      if (params) {
          Object.entries(params).forEach(([paramKey, paramValue]) => {
              text = text.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue));
          });
      }
      return text;
    };
    return (
      <LanguageContext.Provider value={{ locale: defaultLocale, setLocale, t: ssrT }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
