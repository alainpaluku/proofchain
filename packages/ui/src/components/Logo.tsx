/**
 * PROOFCHAIN UI - Logo Component
 * Composant logo réutilisable pour toutes les apps
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ProofchainLogoSVG } from '../assets/ProofchainLogo';

export interface LogoProps {
    /** Sous-titre affiché sous PROOFCHAIN (ex: "Verifier", "Issuer", "Admin") */
    subtitle?: string;
    /** URL de redirection au clic (défaut: "/") */
    href?: string;
    /** Taille du logo */
    size?: 'sm' | 'md' | 'lg';
    /** Afficher uniquement l'icône (mode collapsed) */
    iconOnly?: boolean;
}

export function Logo({ 
    subtitle, 
    href = '/', 
    size = 'md',
    iconOnly = false 
}: LogoProps) {
    const sizeConfig = {
        sm: {
            logoSize: 28,
            title: 'text-lg',
            subtitle: 'text-[10px]',
            gap: 'gap-2',
        },
        md: {
            logoSize: 36,
            title: 'text-xl',
            subtitle: 'text-xs',
            gap: 'gap-3',
        },
        lg: {
            logoSize: 48,
            title: 'text-2xl',
            subtitle: 'text-sm',
            gap: 'gap-4',
        },
    };

    const config = sizeConfig[size];

    const content = (
        <>
            <div className="group-hover:scale-110 transition-transform flex-shrink-0">
                <ProofchainLogoSVG 
                    size={config.logoSize} 
                    color="#6ecaff"
                />
            </div>
            {!iconOnly && (
                <div className="min-w-0">
                    <h1 className={`${config.title} font-bold bg-gradient-to-r from-[#6ecaff] to-blue-500 bg-clip-text text-transparent`}>
                        PROOFCHAIN
                    </h1>
                    {subtitle && (
                        <p className={`${config.subtitle} text-gray-500 dark:text-gray-400 truncate`}>
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={`flex items-center ${config.gap} group`}>
                {content}
            </Link>
        );
    }

    return (
        <div className={`flex items-center ${config.gap} group`}>
            {content}
        </div>
    );
}
