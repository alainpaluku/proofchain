'use client';

import React, { useEffect, useState } from 'react';
import { Building2, FileCheck, CreditCard, Award, TrendingUp, Users } from 'lucide-react';
import { StatCard, Card, CardHeader, useTranslation } from '@proofchain/ui';
import { adminService } from '@proofchain/shared';
import Link from 'next/link';

interface AdminStats {
    totalInstitutions: number;
    pendingKYC: number;
    approvedKYC: number;
    rejectedKYC: number;
    totalDocuments: number;
    totalStudents: number;
}

export default function AdminDashboard() {
    const { t } = useTranslation();
    const [stats, setStats] = useState<AdminStats |null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        setLoading(true);
        const result = await adminService.getAdminStats();
        if (result.success && result.data) {
            setStats(result.data);
        } else {
            setError(result.error || t('common', 'error'));
        }
        setLoading(false);
    };

    const statsCards = [
        {
            icon: Building2,
            iconBgClass: 'bg-purple-100 dark:bg-purple-900/30',
            iconClass: 'text-purple-600 dark:text-purple-400',
            value: loading ? '...' : String(stats?.totalInstitutions || 0),
            label: t('admin', 'registeredInstitutions'),
            change: `${stats?.approvedKYC || 0} ${t('admin', 'approved')}`
        },
        {
            icon: FileCheck,
            iconBgClass: 'bg-blue-100 dark:bg-blue-900/30',
            iconClass: 'text-blue-600 dark:text-blue-400',
            value: loading ? '...' : String(stats?.pendingKYC || 0),
            label: t('admin', 'pendingKYC'),
            change: t('status', 'pending')
        },
        {
            icon: Award,
            iconBgClass: 'bg-green-100 dark:bg-green-900/30',
            iconClass: 'text-green-600 dark:text-green-400',
            value: loading ? '...' : String(stats?.totalDocuments || 0),
            label: t('admin', 'issuedDiplomas'),
            change: t('common', 'total')
        },
        {
            icon: Users,
            iconBgClass: 'bg-yellow-100 dark:bg-yellow-900/30',
            iconClass: 'text-yellow-600 dark:text-yellow-400',
            value: loading ? '...' : String(stats?.totalStudents || 0),
            label: t('students', 'students'),
            change: t('common', 'total')
        }
    ];

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('admin', 'dashboardTitle')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {t('admin', 'platformOverview')}
                </p>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-400">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                    href="/kyc-validation"
                    className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all hover:-translate-y-1"
                >
                    <FileCheck className="w-8 h-8 mb-3" />
                    <h3 className="text-xl font-bold mb-2">{t('admin', 'validateKYC')}</h3>
                    <p className="text-purple-100">{t('admin', 'checkPendingRequests')}</p>
                </Link>

                <Link
                    href="/institutions"
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                    <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('admin', 'manageInstitutions')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t('admin', 'viewAllInstitutions')}</p>
                </Link>

                <Link
                    href="/subscriptions"
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                    <CreditCard className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('nav', 'subscriptions')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t('admin', 'managePlansAndPrices')}</p>
                </Link>
            </div>

            <Card>
                <CardHeader title={t('admin', 'recentActivity')} />
                <div className="space-y-4">
                    <div className="text-center py-12">
                        <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {t('admin', 'noRecentActivity')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('admin', 'activitiesWillAppear')}
                        </p>
                    </div>
                </div>
            </Card>

            <Card>
                <CardHeader 
                    icon={TrendingUp}
                    title={t('admin', 'monthlyRevenue')} 
                    subtitle={t('admin', 'growth')}
                />
                <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="text-gray-500 dark:text-gray-400">{t('admin', 'chartComingSoon')}</p>
                </div>
            </Card>
        </div>
    );
}
