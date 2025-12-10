'use client';

import React from 'react';
import { BarChart3, TrendingUp, Award, Building2, Users, DollarSign } from 'lucide-react';
import { Card, CardHeader, StatCard } from '@proofchain/ui';

export default function StatisticsPage() {
    const globalStats = [
        {
            icon: Building2,
            iconBgClass: 'bg-purple-100 dark:bg-purple-900/30',
            iconClass: 'text-purple-600 dark:text-purple-400',
            value: '0',
            label: 'Institutions totales',
            change: '+0%'
        },
        {
            icon: Award,
            iconBgClass: 'bg-blue-100 dark:bg-blue-900/30',
            iconClass: 'text-blue-600 dark:text-blue-400',
            value: '0',
            label: 'Diplômes émis',
            change: '+0%'
        },
        {
            icon: Users,
            iconBgClass: 'bg-green-100 dark:bg-green-900/30',
            iconClass: 'text-green-600 dark:text-green-400',
            value: '0',
            label: 'Étudiants enregistrés',
            change: '+0%'
        },
        {
            icon: DollarSign,
            iconBgClass: 'bg-yellow-100 dark:bg-yellow-900/30',
            iconClass: 'text-yellow-600 dark:text-yellow-400',
            value: '$0',
            label: 'Revenus totaux',
            change: '+0%'
        }
    ];

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                    Statistiques globales
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Vue d'ensemble des performances de la plateforme
                </p>
            </div>

            {/* Global Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {globalStats.map((stat, index) => (
                    <StatCard
                        key={index}
                        icon={stat.icon}
                        iconBgClass={stat.iconBgClass}
                        iconClass={stat.iconClass}
                        value={stat.value}
                        label={stat.label}
                        change={stat.change}
                    />
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader 
                        icon={TrendingUp}
                        title="Diplômes émis par mois" 
                    />
                    <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <p className="text-gray-500 dark:text-gray-400">Graphique à venir</p>
                    </div>
                </Card>

                <Card>
                    <CardHeader 
                        icon={Building2}
                        title="Nouvelles institutions" 
                    />
                    <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <p className="text-gray-500 dark:text-gray-400">Graphique à venir</p>
                    </div>
                </Card>
            </div>

            {/* Revenue by Plan */}
            <Card>
                <CardHeader 
                    icon={DollarSign}
                    title="Revenus par plan d'abonnement" 
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Starter', 'Professional', 'Enterprise'].map((plan) => (
                        <div key={plan} className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{plan}</h4>
                            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">$0</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">0 abonnements actifs</p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Top Institutions */}
            <Card>
                <CardHeader title="Top 10 institutions" subtitle="Par nombre de diplômes émis" />
                <div className="text-center py-12">
                    <Building2 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Aucune donnée disponible</p>
                </div>
            </Card>
        </div>
    );
}
