/**
 * PROOFCHAIN UI - Card Component
 * Composant de carte réutilisable avec variants
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'bordered' | 'gradient';
    padding?: 'sm' | 'md' | 'lg';
    hover?: boolean;
}

export function Card({ 
    children, 
    className = '', 
    variant = 'default',
    padding = 'md',
    hover = false 
}: CardProps) {
    const baseClasses = 'rounded-2xl transition-all';
    
    const variantClasses = {
        default: 'bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700',
        bordered: 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700',
        gradient: 'bg-gradient-to-br from-purple-600 to-blue-600 text-white'
    };
    
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };
    
    const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
    
    return (
        <div className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}>
            {children}
        </div>
    );
}

export interface CardHeaderProps {
    icon?: LucideIcon;
    iconColor?: string;
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

export function CardHeader({ icon: Icon, iconColor = 'text-purple-600', title, subtitle, action }: CardHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                {Icon && (
                    <div className={`p-2 rounded-xl ${iconColor}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                )}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
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
    icon: LucideIcon;
    iconBgClass: string;
    iconClass: string;
    value: string | number;
    label: string;
    change?: string;
}

export function StatCard({ icon: Icon, iconBgClass, iconClass, value, label, change }: StatCardProps) {
    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${iconBgClass}`}>
                    <Icon className={`w-6 h-6 ${iconClass}`} />
                </div>
                {change && (
                    <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {change}
                    </span>
                )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {label}
            </p>
        </Card>
    );
}

export interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
    return (
        <Card className="text-center" padding="lg">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
                {description}
            </p>
            {action && <div className="mt-6">{action}</div>}
        </Card>
    );
}
