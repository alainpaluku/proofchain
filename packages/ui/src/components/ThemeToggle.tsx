'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

// Apply theme changes to document
const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
        root.classList.add('dark');
    } else if (newTheme === 'light') {
        root.classList.remove('dark');
    } else {
        // System theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }
};

/**
 * Theme toggle component with light, dark, and system modes
 * 
 * Features:
 * - Three theme options: light, dark, system
 * - Persists selection to localStorage
 * - Applies theme immediately
 * - Accessible dropdown menu
 */
export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('system');
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Load theme from localStorage on mount and apply it
    useEffect(() => {
        setMounted(true);
        const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
        setTheme(savedTheme);
        applyTheme(savedTheme);
    }, []);

    // Listen for system theme changes
    useEffect(() => {
        if (!mounted || theme !== 'system') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            applyTheme('system');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [mounted, theme]);

    // Listen for storage changes (theme changes in other tabs)
    useEffect(() => {
        if (!mounted) return;

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'theme' && e.newValue) {
                const newTheme = e.newValue as Theme;
                setTheme(newTheme);
                applyTheme(newTheme);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [mounted]);

    // Handle theme change
    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
        setIsOpen(false);
    };

    // Don't render until mounted to avoid hydration mismatch
    if (!mounted) {
        return (
            <div className="w-[44px] h-[44px] rounded-xl bg-gray-100 dark:bg-gray-700 animate-pulse" />
        );
    }

    const themeIcons = {
        light: Sun,
        dark: Moon,
        system: Monitor,
    };

    const CurrentIcon = themeIcons[theme];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 min-w-[44px] min-h-[44px] rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Changer le thème"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <CurrentIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                        <div className="py-1">
                            <button
                                onClick={() => handleThemeChange('light')}
                                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                    theme === 'light' ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                                }`}
                            >
                                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Clair
                                </span>
                                {theme === 'light' && (
                                    <div className="ml-auto w-2 h-2 rounded-full bg-purple-600" />
                                )}
                            </button>
                            
                            <button
                                onClick={() => handleThemeChange('dark')}
                                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                    theme === 'dark' ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                                }`}
                            >
                                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Sombre
                                </span>
                                {theme === 'dark' && (
                                    <div className="ml-auto w-2 h-2 rounded-full bg-purple-600" />
                                )}
                            </button>
                            
                            <button
                                onClick={() => handleThemeChange('system')}
                                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                    theme === 'system' ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                                }`}
                            >
                                <Monitor className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Système
                                </span>
                                {theme === 'system' && (
                                    <div className="ml-auto w-2 h-2 rounded-full bg-purple-600" />
                                )}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
