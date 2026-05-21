/**
 * PROOFCHAINS UI - Loading Spinner Component
 * PROOFCHAINS - Precision loading state
 */

import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

export interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'primary' | 'white' | 'gray';
    fullScreen?: boolean;
    message?: string;
}

export function LoadingSpinner({
    size = 'md',
    color = 'primary',
    fullScreen = false,
    message,
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24',
    };

    const colorClasses = {
        primary: 'text-primary-600 dark:text-primary-400',
        white: 'text-white',
        gray: 'text-proofchains-outline',
    };

    const spinner = (
        <div className="flex flex-col items-center gap-4">
            <ArrowPathIcon
                className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}
                role="status"
                aria-label="Chargement"
            />
            {message && (
                <p className="label-caps text-proofchains-on-surface-variant dark:text-gray-400 ">
                    {message}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-proofchains-surface/80 dark:bg-proofchains-inverse-surface/80 backdrop-blur-md">
                {spinner}
            </div>
        );
    }

    return spinner;
}
