import React from 'react';
import { Github } from 'lucide-react';
import { useTranslation } from '@proofchain/ui';
import { ProofchainsLogo } from './ProofchainsLogo';

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="py-12 bg-gray-900 dark:bg-black text-white border-t border-gray-800">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-900/50 rounded-xl">
                            <ProofchainsLogo size={24} className="text-cyan-400" />
                        </div>
                        <span className="font-bold text-lg">PROOF<span className="text-cyan-400">CHAINS</span></span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-500 text-sm">{t('landing', 'submittedTo')}</span>
                        <a href="https://cats.wada.org/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <img src="https://cats.wada.org/brand_assets/CAT-logo.svg" alt="Cardano Africa Summit" className="h-10" />
                        </a>
                    </div>
                    <p className="text-gray-400 text-sm text-center">
                        © 2024 Proofchains. {t('landing', 'projectDesc')}
                    </p>
                    <a href="https://github.com/alainpaluku/proofchains" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                        <span className="text-sm">GitHub</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
