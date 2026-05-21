'use client';
import React, { useState, useEffect } from 'react';
import { Navbar } from '@proofchain/ui';
import { HeroSection } from '../components/sections/HeroSection';
import { StatsSection } from '../components/sections/StatsSection';
import { VideoPresentationSection } from '../components/sections/VideoPresentationSection';
import { VideoDemoSection } from '../components/sections/VideoDemoSection';
import { ProblemSection } from '../components/sections/ProblemSection';
import { FeaturesSection } from '../components/sections/FeaturesSection';
import { StakeholdersSection } from '../components/sections/StakeholdersSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { TechStackSection } from '../components/sections/TechStackSection';
import { IssuersSection } from '../components/sections/IssuersSection';
import { FaqSection } from '../components/sections/FaqSection';
import DocumentationSection from '../components/DocumentationSection';
import { CtaSection } from '../components/sections/CtaSection';
import { Footer } from '../components/Footer';
import { useTranslation } from '@proofchain/ui';
import { PROOFCHAINSLogo } from '../components/PROOFCHAINSLogo';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function PROOFCHAINSPage() {
    const [mounted, setMounted] = useState(false);
    const { t } = useTranslation();

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    const navItems = [
        { label: t('nav', 'home'), href: '#accueil' },
        { label: t('nav', 'features'), href: '#features' },
        { label: t('nav', 'forWho'), href: '#pourqui' },
        { label: t('nav', 'faq'), href: '#faq' }
    ];

    const logo = (
        <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-primary-900 dark:bg-primary-600 transition-all duration-300">
                <PROOFCHAINSLogo size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-proofchains-on-surface dark:text-white tracking-tight uppercase">
                PROOFCHAINS
            </span>
        </div>
    );

    const navAction = (
        <a
            href="#verify"
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-primary-900 dark:bg-primary-600 hover:bg-black dark:hover:bg-primary-500 text-white text-sm font-bold rounded-lg transition-all shadow-sm "
        >
            <MagnifyingGlassIcon className="w-4 h-4" />
            {t('nav', 'verify')}
        </a>
    );

    return (
        <div className="min-h-screen bg-proofchains-surface dark:bg-proofchains-inverse-surface text-proofchains-on-surface dark:text-proofchains-inverse-on-surface overflow-x-hidden">
            <Navbar
                logo={logo}
                items={navItems}
                action={navAction}
            />
            
            <main className="pt-20">
                <HeroSection />
                <StatsSection />
                <VideoPresentationSection />
                <VideoDemoSection />
                <ProblemSection />
                <FeaturesSection />
                <StakeholdersSection />
                <HowItWorksSection />
                <TechStackSection />
                <IssuersSection />
                <FaqSection />
                <DocumentationSection />
                <CtaSection />
            </main>
            
            <Footer />
        </div>
    );
}
