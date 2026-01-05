import React from 'react';
import { Play } from 'lucide-react';
import { useTranslation } from '@proofchain/ui';

export function VideoDemoSection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-6">
                        <Play className="w-4 h-4" />
                        {t('landing', 'demo')}
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                        {t('landing', 'seeInAction')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        {t('landing', 'demoDesc')}
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-green-500/20 border border-gray-200 dark:border-gray-800">
                        <iframe className="w-full h-full" src="https://www.youtube.com/embed/6DV1eMeAnC4" title="Démonstration Proofchains" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                    </div>
                </div>
            </div>
        </section>
    );
}
