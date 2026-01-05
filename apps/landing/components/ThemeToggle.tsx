import React from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ theme, toggleTheme, isScrolled }: { theme: string; toggleTheme: () => void; isScrolled: boolean }) {
    return (
        <button 
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-all duration-300 ${
                isScrolled 
                    ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700' 
                    : 'bg-white/10 hover:bg-white/20'
            }`}
            aria-label={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
        >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
        </button>
    );
}
