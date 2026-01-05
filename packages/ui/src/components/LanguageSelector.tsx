'use client';

import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { FlagIcon } from './FlagIcon';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'dropdown';
  isScrolled?: boolean;
}

export function LanguageSelector({ className = '', variant = 'default', isScrolled = false }: LanguageSelectorProps) {
  const { locale, setLocale } = useTranslation();

  const toggleLocale = () => {
    setLocale(locale === 'fr' ? 'en' : 'fr');
  };

  const buttonClasses = `flex items-center justify-center p-2 rounded-xl transition-all duration-300 ${
    isScrolled
      ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
      : 'bg-white/10 hover:bg-white/20 text-white'
  } ${className}`;

  return (
    <button
      onClick={toggleLocale}
      className={buttonClasses}
      aria-label="Switch language"
      title={locale === 'fr' ? 'Switch to English' : 'Passer en Français'}
    >
      <FlagIcon locale={locale} className="w-6 h-6 rounded-md shadow-sm" />
    </button>
  );
}
