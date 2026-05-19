/**
 * PROOFCHAIN UI - Card Component
 * Auralis System - Tonal Layering style
 */

import React from 'react';

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'recessed' | 'elevated' | 'gradient';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    hover?: boolean;
}

export function Card({ 
    children, 
    className = '', 
    variant = 'default',
    padding = 'md',
    hover = false 
}: CardProps) {
    const baseClasses = 'rounded-xl transition-all duration-300'; // xl is 1.5rem / 24px as per Auralis
    
    const variantClasses = {
        // White cards (#FCFCFB / White) represent the highest interactive surface level.
        // Must have a 1px border of #E7E7E4
        default: 'bg-white dark:bg-auralis-inverse-surface border border-auralis-surface-highest dark:border-auralis-on-surface-variant',
        // Recessed Layer: Panels (#F3F2EF) which are used for sidebars, secondary navigation, or groupings.
        // These should appear "cut into" the base.
        recessed: 'bg-auralis-surface-container-low dark:bg-black/20 border border-transparent',
        // Elevated: White cards with slight depth (though Auralis favors borders, we can add a subtle glow)
        elevated: 'bg-white dark:bg-auralis-inverse-surface border border-auralis-surface-highest shadow-sm',
        gradient: 'bg-gradient-to-br from-primary-600 to-primary-800 text-white'
    };
    
    const paddingClasses = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10'
    };
    
    const hoverClasses = hover ? 'hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md' : '';
    
    return (
        <div className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}>
            {children}
        </div>
    );
}

export interface CardHeaderProps {
    icon?: React.ElementType;
    iconColor?: string;
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

export function CardHeader({ icon: Icon, iconColor = 'text-primary-600', title, subtitle, action }: CardHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
                {Icon && (
                    <div className={`p-2.5 rounded-lg bg-auralis-surface-container-low dark:bg-white/5 ${iconColor}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                )}
                <div>
                    <h3 className="text-xl font-bold text-auralis-on-surface dark:text-white leading-tight">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-sm text-auralis-on-surface-variant dark:text-gray-400 mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}

export interface StatCardProps {
    icon: React.ElementType;
    iconBgClass?: string;
    iconClass?: string;
    value: string | number;
    label: string;
    change?: string;
}

export function StatCard({ icon: Icon, iconBgClass = 'bg-primary-50 dark:bg-primary-900/20', iconClass = 'text-primary-600', value, label, change }: StatCardProps) {
    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${iconBgClass}`}>
                    <Icon className={`w-6 h-6 ${iconClass}`} />
                </div>
                {change && (
                    <span className={`text-sm font-semibold ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {change}
                    </span>
                )}
            </div>
            <h3 className="text-3xl font-bold text-auralis-on-surface dark:text-white mb-1">
                {value}
            </h3>
            <p className="label-caps text-auralis-on-surface-variant dark:text-gray-400">
                {label}
            </p>
        </Card>
    );
}
