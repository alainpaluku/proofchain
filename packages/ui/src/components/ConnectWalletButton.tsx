'use client';

import React, { useState } from 'react';
import { WalletIcon, ArrowLeftOnRectangleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { useWallet, WalletType } from '../hooks/useWallet';
import { WalletSelector } from './WalletSelector';
import { Button } from './Button';

interface ConnectWalletButtonProps {
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    showBalance?: boolean;
}

// Wallet type display names
const walletNames: Record<string, string> = {
    eternl: 'Eternl',
    'eternl-mobile': 'Eternl',
    lace: 'Lace',
    'lace-mobile': 'Lace',
    nami: 'Nami',
};

export function ConnectWalletButton({
    className = '',
    variant = 'primary',
    size = 'md',
    showBalance = true,
}: ConnectWalletButtonProps) {
    const { 
        connected, 
        address, 
        balance, 
        walletType,
        connect, 
        disconnect, 
        isLoading, 
        error,
        availableWallets,
    } = useWallet();
    
    const [mounted, setMounted] = useState(false);
    const [showSelector, setShowSelector] = useState(false);

    React.useEffect(() => { setMounted(true); }, []);

    const handleConnect = () => {
        setShowSelector(true);
    };

    const handleWalletSelect = async (walletType: WalletType) => {
        setShowSelector(false);
        await connect(walletType);
    };

    if (!mounted) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <Button disabled variant={variant} size={size} icon={WalletIcon}>
                    Connecter
                </Button>
            </div>
        );
    }

    // Check if any wallet is available
    const hasAvailableWallet = availableWallets.some(w => w.installed || w.isMobile);

    if (!hasAvailableWallet) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <Button
                    onClick={handleConnect}
                    variant={variant}
                    size={size}
                    icon={WalletIcon}
                >
                    Installer un portefeuille
                </Button>
                <WalletSelector 
                    isOpen={showSelector} 
                    onClose={() => setShowSelector(false)}
                    onConnect={handleWalletSelect}
                />
            </div>
        );
    }

    return (
        <>
            <div className={`flex items-center gap-2 ${className}`}>
                {connected && showBalance && balance && (
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-proofchains-surface-container-low dark:bg-white/5 rounded-lg border border-proofchains-outline-variant dark:border-proofchains-on-surface-variant">
                        <span className="text-sm font-semibold text-proofchains-on-surface dark:text-white">{balance} ₳</span>
                    </div>
                )}

                {connected ? (
                    <div className="flex items-center">
                        {/* Wallet info badge */}
                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-l-lg border border-r-0 border-green-200 dark:border-green-800">
                            <div className="w-2 h-2 bg-green-500 rounded-full " />
                            <span className="text-sm font-bold text-green-700 dark:text-green-400">
                                {walletType ? walletNames[walletType] : 'Connecté'}
                            </span>
                        </div>
                        
                        {/* Disconnect button */}
                        <button 
                            onClick={disconnect} 
                            disabled={isLoading} 
                            className="flex items-center gap-2 px-4 py-2 bg-error text-white font-bold rounded-r-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Déconnecter</span>
                            <span className="sm:hidden">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                        </button>
                    </div>
                ) : (
                    <Button
                        onClick={handleConnect} 
                        loading={isLoading}
                        variant={variant}
                        size={size}
                        icon={WalletIcon}
                        iconPosition="left"
                    >
                        Connecter
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                    </Button>
                )}
            </div>

            {error && (
                <div className="fixed bottom-4 right-4 p-4 bg-error-container text-error border border-error/20 rounded-lg text-sm font-bold shadow-sm z-50">
                    {error}
                </div>
            )}

            <WalletSelector 
                isOpen={showSelector} 
                onClose={() => setShowSelector(false)}
                onConnect={handleWalletSelect}
            />
        </>
    );
}
