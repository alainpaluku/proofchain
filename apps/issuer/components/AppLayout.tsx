'use client';

import React from 'react';
import { AppLayout as SharedAppLayout, type SidebarItem, useI18n } from '@proofchain/ui';
import { Coins, Users, FileCheck, Settings, CreditCard, Home, Shield } from 'lucide-react';
import Link from 'next/link';
import { issuerTranslations } from '../lib/translations';

interface LayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
    const { t } = useI18n(issuerTranslations);
    
    const menuItems: SidebarItem[] = [
        {
            label: t('issuer.nav.dashboard'),
            icon: Home,
            href: '/',
        },
        {
            label: t('issuer.nav.mint'),
            icon: Coins,
            href: '/mint',
        },
        {
            label: t('issuer.nav.students'),
            icon: Users,
            href: '/students',
        },
        {
            label: t('issuer.nav.kyc'),
            icon: FileCheck,
            href: '/kyc',
        },
        {
            label: t('issuer.nav.subscriptions'),
            icon: CreditCard,
            href: '/subscriptions',
        },
        {
            label: t('issuer.nav.settings'),
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
                <p className="text-xs text-gray-500 dark:text-gray-400">Issuer</p>
            </div>
        </Link>
    );

    return (
        <SharedAppLayout menuItems={menuItems} logo={logoContent}>
            {children}
        </SharedAppLayout>
    );
}
