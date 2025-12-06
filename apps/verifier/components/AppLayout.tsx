'use client';

import React from 'react';
import { AppLayout as SharedAppLayout, type SidebarItem } from '@proofchain/ui';
import { Home, User, Settings, Shield } from 'lucide-react';
import Link from 'next/link';
import FloatingScanner from './FloatingScanner';

interface LayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {

    const menuItems: SidebarItem[] = [
        {
            label: 'Accueil',
            icon: Home,
            href: '/',
        },
        {
            label: 'Documents',
            icon: Shield,
            href: '/documents',
        },
        {
            label: 'Profil',
            icon: User,
            href: '/profile',
        },
        {
            label: 'Paramètres',
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
                <p className="text-xs text-gray-500 dark:text-gray-400">Verifier</p>
            </div>
        </Link>
    );

    return (
        <>
            <SharedAppLayout menuItems={menuItems} logo={logoContent}>
                {children}
            </SharedAppLayout>

            {/* Floating Scanner Button */}
            <FloatingScanner />
        </>
    );
}
