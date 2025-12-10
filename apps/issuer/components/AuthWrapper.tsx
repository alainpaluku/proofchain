'use client';

import React from 'react';
import { AuthWrapper as SharedAuthWrapper } from '@proofchain/shared';
import { LoadingSpinner } from '@proofchain/ui';
import AppLayout from './AppLayout';

function LoadingComponent() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <LoadingSpinner size="lg" />
        </div>
    );
}

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SharedAuthWrapper
            publicRoutes={['/login']}
            Layout={AppLayout}
            LoadingComponent={LoadingComponent}
        >
            {children}
        </SharedAuthWrapper>
    );
}
