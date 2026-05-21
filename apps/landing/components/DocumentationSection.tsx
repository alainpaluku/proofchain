'use client';

import { useTranslation } from '@proofchain/ui';
import { BookOpen, Download } from 'lucide-react';

export default function DocumentationSection() {
    const { t } = useTranslation();

    const handleReadGuide = () => {
        window.open('/docs/guide-utilisation.pdf', '_blank');
    };

    const handleDownloadGuide = () => {
        const link = document.createElement('a');
        link.href = '/docs/guide-utilisation.pdf';
        link.download = 'Guide-Utilisation-PROOFCHAINS.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section id="documentation" className="py-20 bg-proofchains-surface dark:bg-proofchains-inverse-surface">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Header */}
                    <div className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            📚 {t('landing', 'documentation')}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            {t('landing', 'userGuideTitle')}
                        </p>
                    </div>

                    {/* Description Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 md:p-12 mb-8 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                            {t('landing', 'userGuideDesc')}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleReadGuide}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-900 hover:bg-black text-white font-semibold rounded-2xl transition-all duration-300 shadow-sm hover:shadow-sm "
                            >
                                <BookOpen className="w-5 h-5" />
                                {t('landing', 'readGuide')}
                            </button>
                            
                            <button
                                onClick={handleDownloadGuide}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-2xl transition-all duration-300 shadow-sm hover:shadow-sm  border-2 border-gray-200 dark:border-gray-600"
                            >
                                <Download className="w-5 h-5" />
                                {t('landing', 'downloadGuide')}
                            </button>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        📄 PDF • Français • Mis à jour régulièrement
                    </p>
                </div>
            </div>
        </section>
    );
}
