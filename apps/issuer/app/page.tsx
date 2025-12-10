'use client';

import React from 'react';
import { Coins, Users, FileCheck, Award, Clock } from 'lucide-react';
import Link from 'next/link';
import { StatCard, Card, CardHeader } from '@proofchain/ui';

export default function HomePage() {
    const stats = [
        {
            label: 'Diplômes émis',
            value: '0',
            change: '+0%',
            icon: Award,
            bgClass: 'bg-purple-100 dark:bg-purple-900/30',
            iconClass: 'text-purple-600 dark:text-purple-400'
        },
        {
            label: 'Étudiants',
            value: '0',
            change: '+0%',
            icon: Users,
            bgClass: 'bg-blue-100 dark:bg-blue-900/30',
            iconClass: 'text-blue-600 dark:text-blue-400'
        },
        {
            label: 'Vérifiés',
            value: '0',
            change: '+0%',
            icon: FileCheck,
            bgClass: 'bg-green-100 dark:bg-green-900/30',
            iconClass: 'text-green-600 dark:text-green-400'
        },
        {
            label: 'En attente',
            value: '0',
            change: '+0%',
            icon: Clock,
            bgClass: 'bg-yellow-100 dark:bg-yellow-900/30',
            iconClass: 'text-yellow-600 dark:text-yellow-400'
        }
    ];

    const [recentActivity] = React.useState<Array<{
        student: string;
        action: string;
        time: string;
        status: string;
    }>>([]);

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Tableau de bord
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Vue d'ensemble de votre activité
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        icon={stat.icon}
                        iconBgClass={stat.bgClass}
                        iconClass={stat.iconClass}
                        value={stat.value}
                        label={stat.label}
                        change={stat.change}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                    href="/mint"
                    className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all hover:-translate-y-1"
                >
                    <Coins className="w-8 h-8 mb-3" />
                    <h3 className="text-xl font-bold mb-2">Émettre un diplôme</h3>
                    <p className="text-purple-100">Créer un nouveau NFT diplôme</p>
                </Link>

                <Link
                    href="/students"
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                    <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Gérer les étudiants</h3>
                    <p className="text-gray-600 dark:text-gray-400">Voir et modifier les profils</p>
                </Link>

                <Link
                    href="/kyc"
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                    <FileCheck className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Valider KYC</h3>
                    <p className="text-gray-600 dark:text-gray-400">Vérifier les identités</p>
                </Link>
            </div>

            <Card>
                <CardHeader title="Activité récente" />
                <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {activity.student}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {activity.action}
                                    </p>
                                </div>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {activity.time}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
