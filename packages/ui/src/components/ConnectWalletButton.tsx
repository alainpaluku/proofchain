/**
 * PROOFCHAIN - Connect Wallet Button Component
 * Nami wallet connection with Mesh UI support
 */

'use client';

import React from 'react';
import { Wallet, LogOut, AlertCircle } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useI18n } from '../hooks/useI18n';

interface ConnectWalletButtonProps {
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    showBalance?: boolean;
}

export function ConnectWalletButton({
    className = '',
    variant = 'primary',
    size = 'md',
    showBalance = true,
}: ConnectWalletButtonProps) {
    const { connected, address, balance, connect, disconnect, isLoading, error, isNamiInstalled, isLaceInstalled } = useWallet();
    const { t } = useI18n();
    const [mounted, setMounted] = React.useState(false);

    // Fix hydration error - only render wallet-specific content after mount
    React.useEffect(() => {
        setMounted(true);
    }, []);

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    const variantClasses = {
        primary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white',
        secondary: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white',
        outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20',
    };

    const handleClick = () => {
        if (connected) {
            disconnect();
        } else {
            connect();
        }
    };

    // Show loading state during SSR/hydration
    if (!mounted) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <button
                    disabled
                    className={`
                        flex items-center gap-2 rounded-lg font-medium transition-all
                        ${sizeClasses[size]}
                        ${variantClasses[variant]}
                        opacity-50
                    `}
                >
                    <Wallet className="w-4 h-4" />
                    {t('wallet.connect')}
                </button>
            </div>
        );
    }

    // Show install prompt if no wallet installed
    if (!isNamiInstalled && !isLaceInstalled) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <a
                    href="https://www.lace.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
            flex items-center gap-2 rounded-lg font-medium transition-all
            ${sizeClasses[size]}
            ${variantClasses[variant]}
          `}
                >
                    <AlertCircle className="w-4 h-4" />
                    Install Lace Wallet
                </a>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {connected && showBalance && balance && (
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {balance} ₳
                    </span>
                </div>
            )}

            <button
                onClick={handleClick}
                disabled={isLoading}
                className={`
          flex items-center gap-2 rounded-lg font-medium transition-all
          disabled:opacity-50 disabled:cursor-not-allowed
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${className}
        `}
            >
                {isLoading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t('status.loading')}
                    </>
                ) : connected ? (
                    <>
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">{t('wallet.disconnect')}</span>
                        <span className="sm:hidden">
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                    </>
                ) : (
                    <>
                        <Wallet className="w-4 h-4" />
                        {t('wallet.connect')}
                    </>
                )}
            </button>

            {error && (
                <div className="absolute top-full mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400 max-w-xs">
                    {error}
                </div>
            )}
        </div>
    );
}
