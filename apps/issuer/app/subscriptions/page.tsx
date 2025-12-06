'use client';

import React from 'react';
import { CreditCard, Check, Zap, Crown, Star } from 'lucide-react';
import { useI18n } from '@proofchain/ui';
import { issuerTranslations } from '../../lib/translations';

export default function SubscriptionsPage() {
    const { t } = useI18n(issuerTranslations);
    const [currency, setCurrency] = React.useState<'USD' | 'CDF'>('USD');

    const plans = [
        {
            name: 'Starter',
            priceUSD: 15,
            priceCDF: 40_000,
            period: 'mois',
            icon: Zap,
            color: 'blue',
            features: [
                'Jusqu\'à 50 diplômes/mois',
                'Stockage IPFS inclus',
                'Support email',
                'Dashboard basique',
                'API access'
            ],
            current: false
        },
        {
            name: 'Professional',
            priceUSD: 45,
            priceCDF: 120_000,
            period: 'mois',
            icon: Crown,
            color: 'purple',
            features: [
                'Jusqu\'à 500 diplômes/mois',
                'Stockage IPFS illimité',
                'Support prioritaire 24/7',
                'Dashboard avancé',
                'API illimitée',
                'Validation KYC automatique',
                'Branding personnalisé'
            ],
            current: true,
            popular: true
        },
        {
            name: 'Enterprise',
            priceUSD: null,
            priceCDF: null,
            period: '',
            icon: Star,
            color: 'indigo',
            features: [
                'Diplômes illimités',
                'Infrastructure dédiée',
                'Support dédié 24/7',
                'SLA garanti 99.9%',
                'Intégration personnalisée',
                'Formation équipe',
                'Conformité RGPD avancée'
            ],
            current: false
        }
    ];

    const formatPrice = (priceUSD: number | null, priceCDF: number | null) => {
        if (priceUSD === null || priceCDF === null) {
            return 'Sur mesure';
        }
        if (currency === 'USD') {
            return `$${priceUSD}`;
        }
        return `${priceCDF.toLocaleString('fr-FR')} FC`;
    };

    const colorClasses: Record<string, { bg: string; text: string; border: string; button: string }> = {
        blue: {
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            text: 'text-blue-600 dark:text-blue-400',
            border: 'border-blue-200 dark:border-blue-800',
            button: 'bg-blue-600 hover:bg-blue-700'
        },
        purple: {
            bg: 'bg-purple-50 dark:bg-purple-900/20',
            text: 'text-purple-600 dark:text-purple-400',
            border: 'border-purple-200 dark:border-purple-800',
            button: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
        },
        indigo: {
            bg: 'bg-indigo-50 dark:bg-indigo-900/20',
            text: 'text-indigo-600 dark:text-indigo-400',
            border: 'border-indigo-200 dark:border-indigo-800',
            button: 'bg-indigo-600 hover:bg-indigo-700'
        }
    };

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Choisissez votre plan
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    Des solutions adaptées à vos besoins d'émission de diplômes
                </p>
                
                {/* Currency Selector */}
                <div className="inline-flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <button
                        onClick={() => setCurrency('USD')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            currency === 'USD'
                                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-md'
                                : 'text-gray-600 dark:text-gray-400'
                        }`}
                    >
                        USD ($)
                    </button>
                    <button
                        onClick={() => setCurrency('CDF')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            currency === 'CDF'
                                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-md'
                                : 'text-gray-600 dark:text-gray-400'
                        }`}
                    >
                        Franc Congolais (FC)
                    </button>
                </div>
            </div>

            {/* Current Usage */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Plan actuel: Professional</h2>
                        <p className="text-purple-100">Votre abonnement se renouvelle le 15 février 2024</p>
                    </div>
                    <CreditCard className="w-12 h-12 text-white/80" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-purple-100 text-sm mb-1">Diplômes émis ce mois</p>
                        <p className="text-3xl font-bold">234 / 500</p>
                        <div className="mt-2 bg-white/20 rounded-full h-2">
                            <div className="bg-white rounded-full h-2" style={{ width: '47%' }} />
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-purple-100 text-sm mb-1">Stockage IPFS utilisé</p>
                        <p className="text-3xl font-bold">12.4 GB</p>
                        <p className="text-purple-100 text-sm mt-1">Illimité</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-purple-100 text-sm mb-1">Appels API ce mois</p>
                        <p className="text-3xl font-bold">8,432</p>
                        <p className="text-purple-100 text-sm mt-1">Illimité</p>
                    </div>
                </div>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                    const colors = colorClasses[plan.color] || colorClasses.blue;
                    return (
                        <div
                            key={plan.name}
                            className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 p-8 ${plan.popular
                                    ? 'border-purple-500 dark:border-purple-600 scale-105'
                                    : 'border-gray-200 dark:border-gray-700'
                                } ${plan.current ? 'ring-4 ring-purple-200 dark:ring-purple-900/50' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold rounded-full">
                                    POPULAIRE
                                </div>
                            )}

                            {plan.current && (
                                <div className="absolute -top-4 right-4 px-4 py-1 bg-green-600 text-white text-sm font-bold rounded-full">
                                    ACTUEL
                                </div>
                            )}

                            <div className={`inline-flex p-3 rounded-xl ${colors.bg} mb-4`}>
                                <plan.icon className={`w-8 h-8 ${colors.text}`} />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {plan.name}
                            </h3>

                            <div className="mb-6">
                                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                    {formatPrice(plan.priceUSD, plan.priceCDF)}
                                </span>
                                {plan.period && (
                                    <span className="text-gray-600 dark:text-gray-400">
                                        /{plan.period}
                                    </span>
                                )}
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 dark:text-gray-300">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-3 ${colors.button} text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl ${plan.current ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={plan.current}
                            >
                                {plan.current ? 'Plan actuel' : plan.period ? 'Choisir ce plan' : 'Nous contacter'}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Méthode de paiement
                </h2>
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">
                            Visa •••• 4242
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Expire 12/2025
                        </p>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-all">
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    );
}
