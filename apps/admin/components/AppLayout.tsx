'use client';

import React from 'react';
import { AppLayout as SharedAppLayout, type SidebarItem, useI18n } from '@proofchain/ui';
import { Home, Building2, CreditCard, FileCheck, Settings, BarChart3, Shield } from 'lucide-react';
import Link from 'next/link';
import { adminTranslations } from '../lib/translations';

interface LayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
    const { t } = useI18n(adminTranslations);
    
    const menuItems: SidebarItem[] = [
        {
            label: t('admin.nav.dashboard'),
            icon: Home,
            href: '/',
        },
        {
            label: t('admin.nav.institutions'),
            icon: Building2,
            href: '/institutions',
        },
        {
            label: t('admin.nav.kyc'),
            icon: FileCheck,
            href: '/kyc-validation',
        },
        {
            label: t('admin.nav.subscriptions'),
            icon: CreditCard,
            href: '/subscriptions',
        },
        {
            label: t('admin.nav.statistics'),
            icon: BarChart3,
            href: '/statistics',
        },
        {
            label: t('admin.nav.settings'),
            icon: Settings,
            href: '/settings',
        },
    ];

    const logoContent = (
        <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    PROOFCHAIN
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
            </div>
        </Link>
    );

    return (
        <SharedAppLayout menuItems={menuItems} logo={logoContent}>
            {children}
        </SharedAppLayout>
    );
}
