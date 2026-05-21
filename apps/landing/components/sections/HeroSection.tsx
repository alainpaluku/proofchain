import React, { useState } from 'react';
import { Sparkles, ExternalLink, Search, FileCheck, Building2, ArrowRight, Play, Github } from 'lucide-react';
import { useTranslation } from '@proofchain/ui';
import { ProofchainsLogo } from '../ProofchainsLogo';
import { useRouter } from 'next/navigation';

export function HeroSection() {
    const { t } = useTranslation();
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setIsSearching(true);
        await new Promise(r => setTimeout(r, 300));
        router.push(`/verify/${encodeURIComponent(query.trim())}`);
    };

    return (
        <header id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-primary-950" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            
            <div className="relative container mx-auto px-4 lg:px-8 py-32">
                <div className="text-center max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-white/90 text-sm mb-12 border border-white/10">
                        <Sparkles className="w-4 h-4 text-primary-400" />
                        <span>{t('landing', 'hackathonProject')}</span>
                        <span className="w-1 h-1 bg-white/30 rounded-full" />
                        <a href="https://cats.wada.org/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary-400 transition-colors flex items-center gap-1">
                            Cardano Africa Summit <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>

                    <div className="flex justify-center mb-10">
                        <ProofchainsLogo size={120} className="text-primary-400" />
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8 tracking-tight">
                        PROOF<span className="text-primary-500">CHAINS</span>
                    </h1>

                    <p className="text-xl lg:text-2xl text-primary-100 mb-4 font-light">
                        {t('landing', 'heroTitle')}
                    </p>

                    <p className="text-base lg:text-lg text-primary-200/70 mb-10 max-w-2xl mx-auto">
                        {t('landing', 'heroSubtitle')}
                    </p>

                    {/* Search Form */}
                    <div id="verify" className="max-w-2xl mx-auto mb-12">
                        <form onSubmit={handleVerify} className="relative">
                            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/5 rounded-2xl border border-white/10">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                                    <input 
                                        type="text" 
                                        value={query} 
                                        onChange={(e) => setQuery(e.target.value)} 
                                        placeholder={t('landing', 'searchPlaceholder')}
                                        className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-white/50 focus:outline-none text-lg"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={!query.trim() || isSearching}
                                    className="px-8 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm min-w-[160px]"
                                >
                                    {isSearching ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <FileCheck className="w-5 h-5" />
                                            <span>{t('nav', 'verify')}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <p className="text-sm text-primary-200/60 mt-3">{t('landing', 'searchExample')}</p>
                        </form>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://issuer.proofchains.org/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ">
                            <Building2 className="w-5 h-5" />
                            {t('landing', 'accessIssuerPlatform')}
                            <ArrowRight className="w-5 h-5" />
                        </a>
                        <a href="#features" className="group px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 border border-white/10">
                            <Play className="w-5 h-5" />
                            {t('landing', 'discover')}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="https://github.com/alainpaluku/proofchains" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 border border-white/10">
                            <Github className="w-5 h-5" /> {t('landing', 'sourceCode')}
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 ">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <div className="w-1.5 h-3 bg-white/50 rounded-full " />
                    </div>
                </div>
            </div>
        </header>
    );
}
