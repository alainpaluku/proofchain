import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useTranslation, LanguageSelector } from '@proofchain/ui';
import { ProofchainsLogo } from './ProofchainsLogo';
import { ThemeToggle } from './ThemeToggle';

export function Navbar({ theme, toggleTheme, isScrolled }: { theme: string; toggleTheme: () => void; isScrolled: boolean }) {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: t('nav', 'home'), href: '#accueil' },
        { name: t('nav', 'features'), href: '#features' }, 
        { name: t('nav', 'forWho'), href: '#pourqui' },
        { name: t('nav', 'faq'), href: '#faq' }
    ];

    useEffect(() => {
        const handleResize = () => { if (window.innerWidth >= 1024) setIsMenuOpen(false); };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled 
                ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-lg shadow-gray-200/20 dark:shadow-black/20' 
                : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <a href="#accueil" className="flex items-center gap-3 group">
                        <div className={`p-2 rounded-xl transition-all duration-300 ${isScrolled ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-white/10'}`}>
                            <ProofchainsLogo size={28} className={`transition-colors duration-300 ${isScrolled ? 'text-purple-600 dark:text-purple-400' : 'text-cyan-400'}`} />
                        </div>
                        <span className={`text-lg lg:text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                            PROOF<span className="text-cyan-400">CHAINS</span>
                        </span>
                    </a>

                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((l) => (
                            <a key={l.name} href={l.href} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                isScrolled 
                                    ? 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20' 
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                            }`}>
                                {l.name}
                            </a>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-3">
                        <LanguageSelector variant="minimal" isScrolled={isScrolled} />
                        <ThemeToggle theme={theme} toggleTheme={toggleTheme} isScrolled={isScrolled} />
                        <a href="#verify" className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105">
                            <Search className="w-4 h-4" /> {t('nav', 'verify')}
                        </a>
                    </div>

                    <div className="flex lg:hidden items-center gap-2">
                        <LanguageSelector variant="minimal" isScrolled={isScrolled} />
                        <ThemeToggle theme={theme} toggleTheme={toggleTheme} isScrolled={isScrolled} />
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2.5 rounded-xl transition-all duration-300 ${isScrolled ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'}`}>
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden transition-all duration-500 ease-out ${isMenuOpen ? 'max-h-[400px] opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 space-y-1">
                        {navLinks.map((l) => (
                            <a key={l.name} href={l.href} onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-colors font-medium">
                                {l.name}
                            </a>
                        ))}
                        <a href="#verify" onClick={() => setIsMenuOpen(false)} className="mt-3 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl flex items-center justify-center gap-2">
                            <Search className="w-4 h-4" /> {t('landing', 'verifyDiploma')}
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
