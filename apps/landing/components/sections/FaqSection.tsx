import React from 'react';
import { BookOpen } from 'lucide-react';
import { useTranslation } from '@proofchain/ui';

export function FaqSection() {
    const { t } = useTranslation();

    const faqs = [
        { question: t('landing', 'whatIsProofchains'), answer: t('landing', 'whatIsProofchainsAnswer') },
        { question: t('landing', 'whatChallenges'), answer: t('landing', 'whatChallengesAnswer') },
        { question: t('landing', 'whyCardano'), answer: t('landing', 'whyCardanoAnswer') },
        { question: t('landing', 'whatValue'), answer: t('landing', 'whatValueAnswer') },
        { question: t('landing', 'localImpact'), answer: t('landing', 'localImpactAnswer') },
    ];

    return (
        <section id="faq" className="py-24 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-6">
                            <BookOpen className="w-4 h-4" />
                            {t('landing', 'faqTitle')}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                            {t('landing', 'faqTitle')}
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                                <h3 className="text-lg font-bold mb-3 flex items-start gap-3">
                                    <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-600 dark:text-purple-400 text-sm font-bold">
                                        {i + 1}
                                    </span>
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-11">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
