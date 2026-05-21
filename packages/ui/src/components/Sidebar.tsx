/**
 * PROOFCHAINS - Sidebar Navigation Component
 * PROOFCHAINS - Recessed style with Heroicons
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarItem {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: string | number;
}

interface SidebarProps {
    items: SidebarItem[];
    logo?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    collapsed?: boolean;
    onClose?: () => void;
}

export function Sidebar({ 
    items, 
    logo, 
    footer, 
    className = '',
    collapsed = false,
    onClose
}: SidebarProps) {
    const pathname = usePathname();

    const handleLinkClick = () => {
        onClose?.();
    };

    return (
        <aside
            className={`
                ${collapsed ? 'w-20' : 'w-64'} 
                h-screen bg-proofchains-surface-container-low dark:bg-proofchains-inverse-surface border-r border-proofchains-surface-highest dark:border-proofchains-on-surface-variant
                flex flex-col fixed left-0 top-0 z-40 transition-all duration-300
                ${className}
            `}
        >
            {/* Logo area - Clean and centered */}
            {logo && (
                <div className={`
                    ${collapsed ? 'p-4' : 'p-8'}
                    border-b border-proofchains-surface-highest dark:border-proofchains-on-surface-variant
                    transition-all duration-300
                    ${collapsed ? 'flex justify-center' : ''}
                `}>
                    {logo}
                </div>
            )}

            {/* Navigation - Recessed list style */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
                {items.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleLinkClick}
                            className={`
                                flex items-center ${collapsed ? 'justify-center' : 'gap-3'} 
                                px-4 py-3 rounded-lg transition-all duration-200
                                ${isActive
                                    ? 'bg-primary-900 dark:bg-primary-600 text-white shadow-sm font-bold'
                                    : 'text-proofchains-on-surface-variant dark:text-gray-400 hover:bg-proofchains-surface-container dark:hover:bg-white/5 hover:text-proofchains-on-surface dark:hover:text-white'
                                }
                            `}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-proofchains-outline'}`} />
                            {!collapsed && (
                                <>
                                    <span className="flex-1 truncate">{item.label}</span>
                                    {item.badge && (
                                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-primary-600 text-white'}`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer with tonal border */}
            {footer && !collapsed && (
                <div className="p-6 border-t border-proofchains-surface-highest dark:border-proofchains-on-surface-variant bg-proofchains-surface-container-low dark:bg-proofchains-inverse-surface">
                    {footer}
                </div>
            )}
        </aside>
    );
}
