import React from 'react';
import { useTranslation } from '@proofchain/ui';

const techStack = [
    { name: 'Cardano', key: 'posBlockchain' },
    { name: 'IPFS', key: 'decentralizedStorage' },
    { name: 'Lucid', key: 'cardanoSdk' },
    { name: 'Blockfrost', key: 'blockchainApi' },
];

export function TechStackSection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('landing', 'techUsed')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t('landing', 'techDesc')}
                    </p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {techStack.map((tech, i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-lg">{tech.name[0]}</span>
                            </div>
                            <h3 className="font-bold mb-1">{tech.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('landing', tech.key as any)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
