/**
 * PROOFCHAIN - Wallet Connection Hook
 * Manage Nami/Lace wallet connection state
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

interface WalletApi {
    getUsedAddresses: () => Promise<string[]>;
    getNetworkId: () => Promise<number>;
    getBalance: () => Promise<string>;
    signTx: (tx: string, partialSign?: boolean) => Promise<string>;
    submitTx: (tx: string) => Promise<string>;
}

export interface WalletState {
    connected: boolean;
    address: string | null;
    balance: string | null;
    network: 'mainnet' | 'preprod' | 'preview' | null;
    walletApi: WalletApi | null;
    isLoading: boolean;
    error: string | null;
}

// Helper to get cardano from window
function getCardano() {
    if (typeof window === 'undefined') return undefined;
    return (window as any).cardano;
}

export function useWallet() {
    const [state, setState] = useState<WalletState>({
        connected: false,
        address: null,
        balance: null,
        network: null,
        walletApi: null,
        isLoading: false,
        error: null,
    });

    const [walletChecked, setWalletChecked] = useState(false);
    const [laceInstalled, setLaceInstalled] = useState(false);
    const [namiInstalled, setNamiInstalled] = useState(false);

    // Check wallet availability on mount
    useEffect(() => {
        const checkWallets = () => {
            const cardano = getCardano();
            setLaceInstalled(!!cardano?.lace);
            setNamiInstalled(!!cardano?.nami);
            setWalletChecked(true);
        };

        // Check immediately and after a delay (wallets inject async)
        checkWallets();
        const timeout = setTimeout(checkWallets, 1000);
        return () => clearTimeout(timeout);
    }, []);

    // Connect to wallet
    const connect = useCallback(async () => {
        const cardano = getCardano();
        
        if (!cardano?.lace && !cardano?.nami) {
            setState(prev => ({
                ...prev,
                error: 'No compatible wallet found. Please install Lace or Nami.',
            }));
            return false;
        }

        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            let walletApi: WalletApi;

            if (cardano?.lace) {
                walletApi = await cardano.lace.enable();
            } else if (cardano?.nami) {
                walletApi = await cardano.nami.enable();
            } else {
                throw new Error('No wallet available');
            }

            const addressHex = await walletApi.getUsedAddresses();
            const address = addressHex[0];

            const networkId = await walletApi.getNetworkId();
            const network = networkId === 0 ? 'preprod' : networkId === 1 ? 'mainnet' : 'preview';

            const balanceHex = await walletApi.getBalance();
            const balance = parseInt(balanceHex, 16) / 1_000_000;

            setState({
                connected: true,
                address,
                balance: balance.toFixed(2),
                network,
                walletApi,
                isLoading: false,
                error: null,
            });

            localStorage.setItem('walletConnected', 'true');
            return true;
        } catch (error: any) {
            console.error('Wallet connection error:', error);
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error.message || 'Failed to connect wallet',
            }));
            return false;
        }
    }, []);

    // Disconnect wallet
    const disconnect = useCallback(() => {
        setState({
            connected: false,
            address: null,
            balance: null,
            network: null,
            walletApi: null,
            isLoading: false,
            error: null,
        });
        localStorage.removeItem('walletConnected');
    }, []);

    // Auto-reconnect
    useEffect(() => {
        if (!walletChecked) return;
        
        const wasConnected = localStorage.getItem('walletConnected');
        if (wasConnected && (laceInstalled || namiInstalled)) {
            connect();
        }
    }, [walletChecked, laceInstalled, namiInstalled, connect]);

    return {
        ...state,
        connect,
        disconnect,
        isLaceInstalled: laceInstalled,
        isNamiInstalled: namiInstalled,
    };
}
