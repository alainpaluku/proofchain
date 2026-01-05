import React from 'react';
import { Users, GraduationCap, Briefcase, Building2, CheckCircle } from 'lucide-react';
import { useTranslation } from '@proofchain/ui';

export function StakeholdersSection() {
    const { t } = useTranslation();

    const valueProps = [
        { icon: GraduationCap, title: t('landing', 'graduates'), description: t('landing', 'graduatesDesc'), benefits: [t('landing', 'permanentProof'), t('landing', 'easySharing'), t('landing', 'internationalRecognition')] },
        { icon: Briefcase, title: t('landing', 'employers'), description: t('landing', 'employersDesc'), benefits: [t('landing', 'freeVerification'), t('landing', 'immediateResult'), t('landing', 'zeroPaperwork')] },
        { icon: Building2, title: t('nav', 'institutions'), description: t('landing', 'institutionsDesc'), benefits: [t('landing', 'simpleProcess'), t('landing', 'reducedCost'), t('landing', 'modernImage')] },
    ];

    return (
        <section id="pourqui" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-6">
                        <Users className="w-4 h-4" />
                        {t('nav', 'forWho')}
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                        {t('landing', 'stakeholderSolution')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        {t('landing', 'stakeholderDesc')}
                    </p>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {valueProps.map((v, i) => (
                        <div key={i} className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/25">
                                <v.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{v.description}</p>
                            <ul className="space-y-3">
                                {v.benefits.map((b, j) => (
                                    <li key={j} className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 text-sm">{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
