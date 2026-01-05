'use client';

import React, { useState } from 'react';
import { CreditCard, Edit, Plus, DollarSign } from 'lucide-react';
import { Card, CardHeader, Button, InputField, useTranslation } from '@proofchain/ui';

interface SubscriptionPlan {
    id: string;
    name: string;
    priceUSD: number;
    priceCDF: number;
    diplomasPerMonth: number;
    features: string[];
    active: boolean;
}

export default function SubscriptionsPage() {
    const { t } = useTranslation();
    const [plans] = useState<SubscriptionPlan[]>([
        {
            id: '1',
            name: 'Starter',
            priceUSD: 15,
            priceCDF: 40000,
            diplomasPerMonth: 50,
            features: ['50 diplômes/mois', 'Stockage IPFS', 'Support email'],
            active: true
        },
        {
            id: '2',
            name: 'Professional',
            priceUSD: 49,
            priceCDF: 130000,
            diplomasPerMonth: 200,
            features: ['200 diplômes/mois', 'Stockage IPFS', 'Support prioritaire', 'API Access'],
            active: true
        },
        {
            id: '3',
            name: 'Enterprise',
            priceUSD: 149,
            priceCDF: 400000,
            diplomasPerMonth: 1000,
            features: ['1000 diplômes/mois', 'Stockage IPFS', 'Support 24/7', 'API Access', 'Personnalisation'],
            active: true
        }
    ]);

    const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-purple-600" />
                        {t('admin', 'subscriptionsManagement')}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {t('admin', 'definePlansAndPricing')}
                    </p>
                </div>
                <Button variant="primary" icon={Plus}>
                    {t('admin', 'newPlan')}
                </Button>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <Card key={plan.id}>
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {plan.name}
                            </h3>
                            <div className="space-y-1">
                                <div className="flex items-baseline justify-center gap-2">
                                    <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                                        ${plan.priceUSD}
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-400">{t('admin', 'perMonth')}</span>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {plan.priceCDF.toLocaleString()} FC{t('admin', 'perMonth')}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            {plan.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" icon={Edit} fullWidth>
                                {t('admin', 'modify')}
                            </Button>
                            <Button 
                                variant={plan.active ? 'ghost' : 'primary'} 
                                size="sm" 
                                fullWidth
                            >
                                {plan.active ? t('admin', 'deactivate') : t('admin', 'activate')}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Edit Form */}
            {editingPlan && (
                <Card>
                    <CardHeader title={t('admin', 'modifyPlan')} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label={t('admin', 'planName')}
                            value={editingPlan.name}
                            onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                        />
                        <InputField
                            label={t('admin', 'priceUSD')}
                            type="number"
                            value={editingPlan.priceUSD}
                            onChange={(e) => setEditingPlan({ ...editingPlan, priceUSD: Number(e.target.value) })}
                        />
                        <InputField
                            label={t('admin', 'priceCDF')}
                            type="number"
                            value={editingPlan.priceCDF}
                            onChange={(e) => setEditingPlan({ ...editingPlan, priceCDF: Number(e.target.value) })}
                        />
                        <InputField
                            label={t('admin', 'plan_diplomasPerMonth')}
                            type="number"
                            value={editingPlan.diplomasPerMonth}
                            onChange={(e) => setEditingPlan({ ...editingPlan, diplomasPerMonth: Number(e.target.value) })}
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                        <Button variant="primary">
                            {t('admin', 'save')}
                        </Button>
                        <Button variant="ghost" onClick={() => setEditingPlan(null)}>
                            {t('admin', 'cancel')}
                        </Button>
                    </div>
                </Card>
            )}

            {/* Statistics */}
            <Card>
                <CardHeader 
                    icon={DollarSign}
                    title={t('admin', 'subscriptionStats')} 
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin', 'monthlyRevenue')}</p>
                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">$0</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">0 FC</p>
                    </div>
                    <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin', 'activeSubscriptionsCount')}</p>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">0</p>
                    </div>
                    <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin', 'conversionRate')}</p>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">0%</p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
