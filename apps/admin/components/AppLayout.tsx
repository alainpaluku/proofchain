'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout as SharedAppLayout, type SidebarItem, Logo, useTranslation } from '@proofchain/ui';
import { useAuth } from '@proofchain/shared';
import { Home, Building2, CreditCard, FileCheck, Settings, BarChart3 } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
    const { user, signOut } = useAuth();
    const { t } = useTranslation();
    const router = useRouter();
    
    const menuItems: SidebarItem[] = [
        { label: t('nav', 'dashboard'), icon: Home, href: '/' },
        { label: t('nav', 'institutions'), icon: Building2, href: '/institutions' },
        { label: t('nav', 'kycValidation'), icon: FileCheck, href: '/kyc-validation' },
        { label: t('nav', 'subscriptions'), icon: CreditCard, href: '/subscriptions' },
        { label: t('nav', 'statistics'), icon: BarChart3, href: '/statistics' },
        { label: t('nav', 'settings'), icon: Settings, href: '/settings' },
    ];

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    };

    const handleSettingsClick = () => {
        router.push('/settings');
    };

    return (
        <SharedAppLayout 
            menuItems={menuItems} 
            logo={(collapsed) => <Logo subtitle="Admin" iconOnly={collapsed} />}
            user={user}
            onSignOut={handleSignOut}
            onSettingsClick={handleSettingsClick}
        >
            {children}
        </SharedAppLayout>
    );
}
