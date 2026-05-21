import React from 'react';
import { CheckCircle, Shield, Globe, Lock, Zap } from 'lucide-react';
import { useTranslation } from '@proofchain/ui';

export function FeaturesSection() {
    const { t } = useTranslation();

    const features = [
        { icon: Shield, title: t('landing', 'immutable'), description: t('landing', 'immutableDesc'), color: 'bg-primary-600' },
        { icon: Globe, title: t('landing', 'universal'), description: t('landing', 'universalDesc'), color: 'bg-blue-600' },
        { icon: Lock, title: t('landing', 'unique'), description: t('landing', 'uniqueDesc'), color: 'bg-green-600' },
        { icon: Zap, title: t('landing', 'instant'), description: t('landing', 'instantDesc'), color: 'bg-orange-600' },
    ];

    return (
        <section id="features" className="py-24 bg-white dark:bg-proofchains-inverse-surface">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-6">
                        <CheckCircle className="w-4 h-4" />
                        {t('landing', 'theSolution')}
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                        {t('landing', 'howItSolves')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        {t('landing', 'solutionDesc')}
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <div key={i} className="group relative bg-proofchains-surface-container-low dark:bg-white/5 rounded-2xl p-8 hover:shadow-sm transition-all duration-500  border border-proofchains-surface-highest dark:border-proofchains-on-surface-variant">
                            <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm  transition-transform duration-300`}>
                                <f.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
