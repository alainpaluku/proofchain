import React from 'react';
import { CheckCircle, Shield, Globe, Lock, Zap } from 'lucide-react';
import { useTranslation } from '@proofchain/ui';

export function FeaturesSection() {
    const { t } = useTranslation();

    const features = [
        { icon: Shield, title: t('landing', 'immutable'), description: t('landing', 'immutableDesc'), color: 'from-purple-500 to-indigo-600' },
        { icon: Globe, title: t('landing', 'universal'), description: t('landing', 'universalDesc'), color: 'from-blue-500 to-cyan-600' },
        { icon: Lock, title: t('landing', 'unique'), description: t('landing', 'uniqueDesc'), color: 'from-green-500 to-emerald-600' },
        { icon: Zap, title: t('landing', 'instant'), description: t('landing', 'instantDesc'), color: 'from-orange-500 to-red-600' },
    ];

    return (
        <section id="features" className="py-24 bg-white dark:bg-gray-950">
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
                        <div key={i} className="group relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                            <div className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
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
