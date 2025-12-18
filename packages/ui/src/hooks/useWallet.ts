/**
 * PROOFCHAIN - Wallet Connection Hook
 * Manage Nami/Lace/Eternal wallet connection state
 * Supports desktop extensions and mobile via deep links
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

export type WalletType = 'nami' | 'lace' | 'eternl' | 'eternl-mobile' | 'vespr' | 'flint' | 'yoroi' | 'yoroi-mobile' | null;

export interface WalletState {
    connected: boolean;
    address: string | null;
    balance: string | null;
    network: 'mainnet' | 'preprod' | 'preview' | null;
    walletApi: WalletApi | null;
    walletType: WalletType;
    isLoading: boolean;
    error: string | null;
}

export interface WalletInfo {
    id: WalletType;
    name: string;
    icon: string;
    installed: boolean;
    isMobile?: boolean;
    deepLink?: string;
    appStoreUrl?: string;
    playStoreUrl?: string;
}

// Helper to get cardano from window
function getCardano() {
    if (typeof window === 'undefined') return undefined;
    return (window as any).cardano;
}

// Check if running on mobile
function isMobileDevice() {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}



// Check if in-app browser (wallet browser)
function isInAppBrowser() {
    if (typeof window === 'undefined') return false;
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes('eternl') || ua.includes('vespr') || ua.includes('flint') || ua.includes('yoroi') || ua.includes('wv');
}

// Helper to detect Eternl wallet (handles different property names)
function getEternlWallet() {
    const cardano = getCardano();
    if (!cardano) return null;
    // Eternl peut être injecté sous différents noms
    return cardano.eternl || cardano.ccvault || null;
}

// Helper to detect Yoroi wallet
function getYoroiWallet() {
    const cardano = getCardano();
    if (!cardano) return null;
    return cardano.yoroi || null;
}

export function useWallet() {
    const [state, setState] = useState<WalletState>({
        connected: false,
        address: null,
        balance: null,
        network: null,
        walletApi: null,
        walletType: null,
        isLoading: false,
        error: null,
    });

    const [walletChecked, setWalletChecked] = useState(false);
    const [availableWallets, setAvailableWallets] = useState<WalletInfo[]>([]);

    // Check wallet availability on mount
    useEffect(() => {
        const checkWallets = () => {
            const cardano = getCardano();
            const isMobile = isMobileDevice();
            const inAppBrowser = isInAppBrowser();
            
            // Desktop wallets
            const eternlWallet = getEternlWallet();
            const yoroiWallet = getYoroiWallet();
            
            const desktopWallets: WalletInfo[] = [
                {
                    id: 'eternl',
                    name: 'Eternl',
                    icon: '🔷',
                    installed: !!eternlWallet,
                    isMobile: false,
                },
                {
                    id: 'yoroi',
                    name: 'Yoroi',
                    icon: '🦋',
                    installed: !!yoroiWallet,
                    isMobile: false,
                },
                {
                    id: 'lace',
                    name: 'Lace',
                    icon: '💎',
                    installed: !!cardano?.lace,
                    isMobile: false,
                },
                {
                    id: 'nami',
                    name: 'Nami',
                    icon: '🦊',
                    installed: !!cardano?.nami,
                    isMobile: false,
                },
                {
                    id: 'flint',
                    name: 'Flint',
                    icon: '🔥',
                    installed: !!cardano?.flint,
                    isMobile: false,
                },
            ];

            // Mobile wallets with deep links
            const mobileWallets: WalletInfo[] = [
                {
                    id: 'eternl-mobile',
                    name: 'Eternl',
                    icon: '📱',
                    installed: true,
                    isMobile: true,
                    deepLink: 'eternl://',
                    appStoreUrl: 'https://apps.apple.com/app/eternl/id1603854498',
                    playStoreUrl: 'https://play.google.com/store/apps/details?id=io.eternl.app',
                },
                {
                    id: 'yoroi-mobile',
                    name: 'Yoroi',
                    icon: '🦋',
                    installed: true,
                    isMobile: true,
                    deepLink: 'yoroi://',
                    appStoreUrl: 'https://apps.apple.com/app/emurgos-yoroi-cardano-wallet/id1447326389',
                    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.emurgo',
                },
                {
                    id: 'vespr',
                    name: 'VESPR',
                    icon: '🌟',
                    installed: true,
                    isMobile: true,
                    deepLink: 'vespr://',
                    appStoreUrl: 'https://apps.apple.com/app/vespr-wallet/id1565749376',
                    playStoreUrl: 'https://play.google.com/store/apps/details?id=art.nft_craze.gallery.main',
                },
            ];

            let wallets: WalletInfo[];

            // If in wallet's in-app browser, check for injected wallet
            if (inAppBrowser && cardano) {
                wallets = desktopWallets.filter(w => w.installed);
                if (wallets.length === 0) {
                    // Fallback: try to detect any cardano wallet
                    const walletKeys = Object.keys(cardano).filter(k => 
                        typeof cardano[k]?.enable === 'function'
                    );
                    if (walletKeys.length > 0) {
                        wallets = [{
                            id: walletKeys[0] as WalletType,
                            name: walletKeys[0].charAt(0).toUpperCase() + walletKeys[0].slice(1),
                            icon: '💳',
                            installed: true,
                            isMobile: false,
                        }];
                    }
                }
            } else if (isMobile) {
                // On mobile browser, show mobile wallet options
                wallets = mobileWallets;
            } else {
                // Desktop: show desktop wallets
                wallets = desktopWallets;
            }

            setAvailableWallets(wallets);
            setWalletChecked(true);
        };

        // Check immediately and after a delay (wallets inject async)
        checkWallets();
        const timeout = setTimeout(checkWallets, 1000);
        // Also check after longer delay for slow wallet injections
        const timeout2 = setTimeout(checkWallets, 2500);
        return () => {
            clearTimeout(timeout);
            clearTimeout(timeout2);
        };
    }, []);

    // Connect to specific wallet
    const connect = useCallback(async (walletType?: WalletType) => {
        const cardano = getCardano();
        const isMobile = isMobileDevice();
        
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            let walletApi: WalletApi;
            let selectedWallet: WalletType = walletType || null;

            // If no wallet type specified, try to auto-detect
            if (!selectedWallet) {
                const eternlWallet = getEternlWallet();
                const yoroiWallet = getYoroiWallet();
                if (eternlWallet) selectedWallet = 'eternl';
                else if (yoroiWallet) selectedWallet = 'yoroi';
                else if (cardano?.lace) selectedWallet = 'lace';
                else if (cardano?.nami) selectedWallet = 'nami';
                else if (isMobile) selectedWallet = 'eternl-mobile';
            }

            // Handle Eternl Mobile via deep link
            if (selectedWallet === 'eternl-mobile') {
                const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
                
                // Eternl mobile deep link format: ouvre le dApp browser avec l'URL
                // Format: eternl://wc?uri=<url> ou eternl://browser?url=<url>
                const isIOSDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
                
                // Essayer plusieurs formats de deep link
                let deepLink: string;
                
                if (isIOSDevice) {
                    // iOS: utiliser le universal link d'Eternl
                    deepLink = `https://eternl.io/app/browser?url=${encodeURIComponent(currentUrl)}`;
                } else {
                    // Android: utiliser le deep link direct
                    deepLink = `eternl://browser?url=${encodeURIComponent(currentUrl)}`;
                }
                
                // Ouvrir le deep link
                window.location.href = deepLink;
                
                // Fallback: si l'app ne s'ouvre pas après 2.5s, proposer d'installer
                const timeout = setTimeout(() => {
                    // Vérifier si on est toujours sur la même page (l'app ne s'est pas ouverte)
                    setState(prev => ({
                        ...prev,
                        isLoading: false,
                        error: null,
                    }));
                    
                    // Proposer d'ouvrir le store
                    const storeUrl = isIOSDevice 
                        ? 'https://apps.apple.com/app/eternl/id1603854498'
                        : 'https://play.google.com/store/apps/details?id=io.eternl.app';
                    
                    if (confirm('Eternl ne s\'est pas ouvert. Voulez-vous l\'installer ?')) {
                        window.open(storeUrl, '_blank');
                    }
                }, 2500);
                
                // Nettoyer le timeout si la page change
                window.addEventListener('blur', () => clearTimeout(timeout), { once: true });
                
                return false;
            }

            // Desktop wallet connection
            switch (selectedWallet) {
                case 'eternl': {
                    const eternlWallet = getEternlWallet();
                    if (!eternlWallet) throw new Error('Eternl wallet not installed');
                    walletApi = await eternlWallet.enable();
                    break;
                }
                case 'yoroi': {
                    const yoroiWallet = getYoroiWallet();
                    if (!yoroiWallet) throw new Error('Yoroi wallet not installed');
                    walletApi = await yoroiWallet.enable();
                    break;
                }
                case 'lace':
                    if (!cardano?.lace) throw new Error('Lace wallet not installed');
                    walletApi = await cardano.lace.enable();
                    break;
                case 'nami':
                    if (!cardano?.nami) throw new Error('Nami wallet not installed');
                    walletApi = await cardano.nami.enable();
                    break;
                case 'flint':
                    if (!cardano?.flint) throw new Error('Flint wallet not installed');
                    walletApi = await cardano.flint.enable();
                    break;
                default:
                    throw new Error('No compatible wallet found. Please install Eternl, Lace, Yoroi or Nami.');
            }

            // Get address - try getUsedAddresses first, fallback to getUnusedAddresses
            let addresses = await walletApi.getUsedAddresses();
            if (!addresses || addresses.length === 0) {
                // Fallback pour les wallets qui n'ont pas encore d'adresses utilisées
                const getUnused = (walletApi as any).getUnusedAddresses;
                if (typeof getUnused === 'function') {
                    addresses = await getUnused.call(walletApi);
                }
            }
            const address = addresses?.[0] || null;

            const networkId = await walletApi.getNetworkId();
            const network = networkId === 0 ? 'preprod' : networkId === 1 ? 'mainnet' : 'preview';

            // Parse balance - CIP-30 retourne du CBOR, on extrait les lovelaces
            const balanceCbor = await walletApi.getBalance();
            let balance = 0;
            try {
                // Le balance CBOR peut être un simple entier ou un tuple [lovelace, assets]
                // Pour simplifier, on essaie de parser le hex comme un entier CBOR
                // Format CBOR: 1b + 8 bytes pour grand entier, ou valeur directe pour petit
                if (balanceCbor.startsWith('1b')) {
                    // Grand entier (8 bytes)
                    balance = parseInt(balanceCbor.slice(2, 18), 16) / 1_000_000;
                } else if (balanceCbor.startsWith('1a')) {
                    // Entier 4 bytes
                    balance = parseInt(balanceCbor.slice(2, 10), 16) / 1_000_000;
                } else if (balanceCbor.startsWith('19')) {
                    // Entier 2 bytes
                    balance = parseInt(balanceCbor.slice(2, 6), 16) / 1_000_000;
                } else if (balanceCbor.startsWith('18')) {
                    // Entier 1 byte
                    balance = parseInt(balanceCbor.slice(2, 4), 16) / 1_000_000;
                } else if (balanceCbor.startsWith('82')) {
                    // Tuple [lovelace, assets] - extraire le premier élément
                    const lovelacePart = balanceCbor.slice(2);
                    if (lovelacePart.startsWith('1b')) {
                        balance = parseInt(lovelacePart.slice(2, 18), 16) / 1_000_000;
                    } else if (lovelacePart.startsWith('1a')) {
                        balance = parseInt(lovelacePart.slice(2, 10), 16) / 1_000_000;
                    } else {
                        balance = parseInt(lovelacePart.slice(0, 2), 16) / 1_000_000;
                    }
                } else {
                    // Petit entier direct (0-23)
                    balance = parseInt(balanceCbor.slice(0, 2), 16) / 1_000_000;
                }
            } catch (e) {
                console.warn('Could not parse balance CBOR:', balanceCbor);
                balance = 0;
            }

            setState({
                connected: true,
                address,
                balance: balance.toFixed(2),
                network,
                walletApi,
                walletType: selectedWallet,
                isLoading: false,
                error: null,
            });

            localStorage.setItem('walletConnected', 'true');
            localStorage.setItem('walletType', selectedWallet || '');
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
            walletType: null,
            isLoading: false,
            error: null,
        });
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletType');
    }, []);

    // Auto-reconnect
    useEffect(() => {
        if (!walletChecked) return;
        
        const wasConnected = localStorage.getItem('walletConnected');
        const savedWalletType = localStorage.getItem('walletType') as WalletType;
        
        if (wasConnected && savedWalletType && savedWalletType !== 'eternl-mobile') {
            const wallet = availableWallets.find(w => w.id === savedWalletType);
            if (wallet?.installed) {
                connect(savedWalletType);
            }
        }
    }, [walletChecked, availableWallets, connect]);

    // Legacy compatibility
    const isLaceInstalled = availableWallets.some(w => w.id === 'lace' && w.installed);
    const isNamiInstalled = availableWallets.some(w => w.id === 'nami' && w.installed);
    const isEternlInstalled = availableWallets.some(w => w.id === 'eternl' && w.installed);

    return {
        ...state,
        connect,
        disconnect,
        availableWallets,
        isLaceInstalled,
        isNamiInstalled,
        isEternlInstalled,
        isMobile: isMobileDevice(),
    };
}
