'use client';

import React from 'react';
import { AuthWrapper as SharedAuthWrapper } from '@proofchain/shared';
import { LoadingSpinner, useTranslation } from '@proofchain/ui';
import AppLayout from './AppLayout';
import { ShieldOff } from 'lucide-react';

function LoadingComponent() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <LoadingSpinner size="lg" />
        </div>
    );
}

function UnauthorizedComponent() {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center p-8">
                <div className="inline-flex p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                    <ShieldOff className="w-12 h-12 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('auth', 'unauthorizedAccess')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {t('auth', 'noAdminRights')}
                </p>
                <a
                    href="http://localhost:3001"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all"
                >
                    {t('auth', 'goToIssuer')}
                </a>
            </div>
        </div>
    );
}

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SharedAuthWrapper
            publicRoutes={['/login']}
            Layout={AppLayout}
            requireAdmin={true}
            nonAdminRedirectUrl="http://localhost:3001"
            LoadingComponent={LoadingComponent}
            UnauthorizedComponent={UnauthorizedComponent}
        >
            {children}
        </SharedAuthWrapper>
    );
}
