/**
 * PROOFCHAIN - Language Selector Component
 * Switch between FR, EN, SW, LN
 */

'use client';

import React from 'react';
import { Languages } from 'lucide-react';
import { useI18n, Language } from '../hooks/useI18n';

const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
    { code: 'ln', name: 'Lingala', flag: '🇨🇩' },
];

interface LanguageSelectorProps {
    className?: string;
    variant?: 'dropdown' | 'buttons' | 'icon';
}

export function LanguageSelector({ className = '', variant = 'dropdown' }: LanguageSelectorProps) {
    const { language, setLanguage } = useI18n();
    const [isOpen, setIsOpen] = React.useState(false);

    const currentLanguage = languages.find(l => l.code === language);

    if (variant === 'buttons') {
        return (
            <div className={`flex gap-2 ${className}`}>
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${language === lang.code
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }
            `}
                    >
                        {lang.flag} {lang.code.toUpperCase()}
                    </button>
                ))}
            </div>
        );
    }

    if (variant === 'icon') {
        return (
            <div className={`relative ${className}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 min-w-[44px] min-h-[44px] rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Changer la langue"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    <Languages className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                            <div className="py-1">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setIsOpen(false);
                                        }}
                                        className={`
                                            w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                                            ${language === lang.code ? 'bg-gray-50 dark:bg-gray-700/50' : ''}
                                        `}
                                    >
                                        <span className="text-xl">{lang.flag}</span>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {lang.name}
                                        </span>
                                        {language === lang.code && (
                                            <div className="ml-auto w-2 h-2 rounded-full bg-purple-600" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all"
            >
                <Languages className="w-4 h-4" />
                <span className="text-sm font-medium">
                    {currentLanguage?.flag} {currentLanguage?.name}
                </span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code);
                                    setIsOpen(false);
                                }}
                                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left transition-all
                  first:rounded-t-lg last:rounded-b-lg
                  ${language === lang.code
                                        ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }
                `}
                            >
                                <span className="text-xl">{lang.flag}</span>
                                <span className="text-sm font-medium">{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
