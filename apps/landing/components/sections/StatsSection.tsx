import React from 'react';
import { useTranslation } from '@proofchain/ui';
import { AnimatedCounter } from '../AnimatedCounter';

export function StatsSection() {
    const { t } = useTranslation();

    const stats = [
        { value: 100, suffix: '%', label: t('landing', 'unforgeable') },
        { value: 3, suffix: 's', label: t('landing', 'verification') },
        { value: 0, suffix: '', label: t('landing', 'noIntermediary') },
        { value: 24, suffix: '/7', label: t('landing', 'available') },
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-indigo-900 to-purple-900 relative">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl lg:text-5xl font-black text-white mb-2">
                                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-purple-200/70 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
