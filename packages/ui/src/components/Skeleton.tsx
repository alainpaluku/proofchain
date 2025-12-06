/**
 * PROOFCHAIN UI - Skeleton Component
 * Composant de chargement skeleton
 */

import React from 'react';

export interface SkeletonProps {
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    className?: string;
}

export function Skeleton({
    variant = 'text',
    width,
    height,
    className = '',
}: SkeletonProps) {
    const variantClasses = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };

    const defaultHeight = {
        text: '1rem',
        circular: '3rem',
        rectangular: '10rem',
    };

    const style = {
        width: width || (variant === 'circular' ? '3rem' : '100%'),
        height: height || defaultHeight[variant],
    };

    return (
        <div
            className={`animate-skeleton ${variantClasses[variant]} ${className}`}
            style={style}
            aria-busy="true"
            aria-live="polite"
        />
    );
}

// Skeleton presets
export function SkeletonCard() {
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
                <Skeleton variant="circular" width="3rem" height="3rem" />
                <div className="flex-1 space-y-2">
                    <Skeleton width="60%" height="1.25rem" />
                    <Skeleton width="40%" height="1rem" />
                </div>
            </div>
            <Skeleton height="4rem" className="mb-2" />
            <Skeleton width="80%" height="1rem" />
        </div>
    );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                    <Skeleton variant="circular" width="2.5rem" height="2.5rem" />
                    <Skeleton width="30%" height="1rem" />
                    <Skeleton width="20%" height="1rem" />
                    <Skeleton width="15%" height="1rem" />
                    <Skeleton width="10%" height="1rem" />
                </div>
            ))}
        </div>
    );
}
