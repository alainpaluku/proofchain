/**
 * PROOFCHAIN - Theme Hook
 * Manage light/dark theme
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>('light');

    // Load theme from localStorage and system preference
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme') as Theme;
            if (saved) {
                setTheme(saved);
                document.documentElement.classList.toggle('dark', saved === 'dark');
            } else {
                // Check system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const systemTheme = prefersDark ? 'dark' : 'light';
                setTheme(systemTheme);
                document.documentElement.classList.toggle('dark', prefersDark);
            }
        }
    }, []);

    // Toggle theme
    const toggleTheme = useCallback(() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
        }
    }, [theme]);

    // Set specific theme
    const setSpecificTheme = useCallback((newTheme: Theme) => {
        setTheme(newTheme);

        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
        }
    }, []);

    return {
        theme,
        toggleTheme,
        setTheme: setSpecificTheme,
        isDark: theme === 'dark',
    };
}
