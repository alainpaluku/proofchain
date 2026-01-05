import React from 'react';
import { School, Building2, ArrowRight, GraduationCap, BookOpen } from 'lucide-react';
import { useTranslation } from '@proofchain/ui';

export function IssuersSection() {
    const { t } = useTranslation();

    const institutionTypes = [
        { icon: School, name: t('landing', 'universities'), description: t('landing', 'universitiesDesc') },
        { icon: GraduationCap, name: t('landing', 'higherEducation'), description: t('landing', 'higherEducationDesc') },
        { icon: BookOpen, name: t('landing', 'trainingCenters'), description: t('landing', 'trainingCentersDesc') },
        { icon: Building2, name: t('landing', 'technicalInstitutes'), description: t('landing', 'technicalInstitutesDesc') },
    ];

    return (
        <section id="emetteurs" className="py-24 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium mb-6">
                        <School className="w-4 h-4" />
                        {t('landing', 'issuancePlatform')}
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                        {t('landing', 'reservedFor')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
                        {t('landing', 'reservedDesc')}
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {institutionTypes.map((inst, i) => (
                        <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <inst.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{inst.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{inst.description}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 lg:p-12 text-center border border-indigo-100 dark:border-indigo-800">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                        {t('landing', 'areYouInstitution')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        {t('landing', 'accessPlatformDesc')}
                    </p>
                    <a href="https://issuer.proofchains.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40">
                        <Building2 className="w-5 h-5" />
                        {t('landing', 'accessIssuerPlatform')}
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
