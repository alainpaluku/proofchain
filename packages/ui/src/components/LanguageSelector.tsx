'use client';

import React from 'react';
import { LanguageIcon, CheckIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { useTranslation } from '../contexts/LanguageContext';

export interface LanguageSelectorProps {
  variant?: 'default' | 'minimal';
}

export function LanguageSelector({ variant = 'default' }: LanguageSelectorProps) {
  const { locale: language, setLocale: setLanguage } = useTranslation();

  const languages = [
    { id: 'en', name: 'English', flag: '🇺🇸' },
    { id: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-auralis-inverse-surface border border-auralis-surface-highest dark:border-auralis-on-surface-variant text-auralis-on-surface dark:text-white hover:bg-auralis-surface-container-low dark:hover:bg-white/5 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <LanguageIcon className="w-5 h-5 text-auralis-outline" />
        <span className="text-sm font-bold uppercase">{language}</span>
      </Menu.Button>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white dark:bg-auralis-inverse-surface border border-auralis-surface-highest dark:border-auralis-on-surface-variant rounded-xl shadow py-1.5 z-50 focus:outline-none">
          <div className="px-3 py-1 mb-1">
            <p className="text-[10px] label-caps text-auralis-on-surface-variant dark:text-gray-500">Langue</p>
          </div>
          {languages.map((lang) => (
            <Menu.Item key={lang.id}>
              {({ active }) => (
                <button
                  onClick={() => setLanguage(lang.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold transition-colors ${
                    active ? 'bg-auralis-surface-container-low dark:bg-white/5 text-primary-600 dark:text-primary-400' : 'text-auralis-on-surface dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    {lang.name}
                  </div>
                  {language === lang.id && <CheckIcon className="w-4 h-4 text-primary-500" />}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
