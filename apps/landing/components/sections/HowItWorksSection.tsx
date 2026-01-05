import React from 'react';
import { BookOpen, Building2, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from '@proofchain/ui';

export function HowItWorksSection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
                        <BookOpen className="w-4 h-4" />
                        {t('landing', 'howItWorks')}
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                        {t('landing', 'simpleAs')}
                    </h2>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 hidden md:block" />
                        {[
                            { step: '01', title: t('landing', 'step1Title'), description: t('landing', 'step1Desc'), icon: Building2, color: 'purple' },
                            { step: '02', title: t('landing', 'step2Title'), description: t('landing', 'step2Desc'), icon: Shield, color: 'blue' },
                            { step: '03', title: t('landing', 'step3Title'), description: t('landing', 'step3Desc'), icon: CheckCircle, color: 'green' },
                        ].map((item, i) => (
                            <div key={i} className="relative flex gap-8 mb-12 last:mb-0">
                                <div className={`w-16 h-16 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-2xl flex items-center justify-center flex-shrink-0 z-10 border-4 border-white dark:border-gray-950`}>
                                    <item.icon className={`w-8 h-8 text-${item.color}-600 dark:text-${item.color}-400`} />
                                </div>
                                <div className="flex-1 pt-2">
                                    <div className="text-sm font-bold text-purple-600 dark:text-purple-400 mb-1">{t('landing', 'step')} {item.step}</div>
                                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 text-center">
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {t('landing', 'startIssuing')}
                        </p>
                        <a href="https://issuer.proofchains.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105">
                            <Building2 className="w-5 h-5" />
                            {t('landing', 'accessIssuerPlatform')}
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
