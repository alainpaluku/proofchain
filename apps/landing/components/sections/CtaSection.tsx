import React from 'react';
import { Search, Github } from 'lucide-react';
import { useTranslation } from '@proofchain/ui';

export function CtaSection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
            <div className="relative container mx-auto px-4 lg:px-8 text-center">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                    {t('landing', 'verifyNow')}
                </h2>
                <p className="text-purple-200 text-lg mb-10 max-w-2xl mx-auto">
                    {t('landing', 'verifyFreeDesc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#verify" className="px-8 py-4 bg-white text-purple-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl flex items-center justify-center gap-2">
                        <Search className="w-5 h-5" />
                        {t('landing', 'verifyDiploma')}
                    </a>
                    <a href="https://github.com/alainpaluku/proofchains" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center gap-2">
                        <Github className="w-5 h-5" />
                        {t('landing', 'sourceCode')}
                    </a>
                </div>
            </div>
        </section>
    );
}
