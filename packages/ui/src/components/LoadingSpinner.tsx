/**
 * PROOFCHAIN UI - Loading Spinner Component
 * Composant de chargement réutilisable
 */

import React from 'react';

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
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
        xl: 'w-16 h-16 border-4',
    };

    const colorClasses = {
        primary: 'border-purple-600 border-t-transparent',
        white: 'border-white border-t-transparent',
        gray: 'border-gray-400 border-t-transparent',
    };

    const spinner = (
        <div className="flex flex-col items-center gap-3">
            <div
                className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
                role="status"
                aria-label="Chargement"
            />
            {message && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {message}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                {spinner}
            </div>
        );
    }

    return spinner;
}
