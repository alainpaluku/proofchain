'use client';

import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ComputerDesktopIcon, DevicePhoneMobileIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { WalletType } from '../hooks/useWallet';

interface WalletSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: (walletType: WalletType) => void;
}

const wallets = [
    { id: 'eternl' as WalletType, name: 'Eternl', icon: 'https://eternl.io/favicon.ico', isMobile: false },
    { id: 'lace' as WalletType, name: 'Lace', icon: 'https://www.lace.io/favicon.ico', isMobile: false },
    { id: 'nami' as WalletType, name: 'Nami', icon: 'https://namiwallet.io/favicon.ico', isMobile: false },
    { id: 'eternl-mobile' as WalletType, name: 'Eternl Mobile', icon: 'https://eternl.io/favicon.ico', isMobile: true },
    { id: 'lace-mobile' as WalletType, name: 'Lace Mobile', icon: 'https://www.lace.io/favicon.ico', isMobile: true },
];

export function WalletSelector({ isOpen, onClose, onConnect }: WalletSelectorProps) {
    const [selectedTab, setSelectedTab] = React.useState<'desktop' | 'mobile'>('desktop');

    const filteredWallets = wallets.filter(w =>
        selectedTab === 'mobile' ? w.isMobile : !w.isMobile
    );

    return (
        <Transition show={isOpen} as={React.Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-auralis-inverse-surface border border-auralis-surface-highest dark:border-auralis-on-surface-variant text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <Dialog.Title as="h3" className="text-xl font-bold text-auralis-on-surface dark:text-white">
                                            Choisir un portefeuille
                                        </Dialog.Title>
                                        <button
                                            onClick={onClose}
                                            className="rounded-full p-1 text-auralis-outline hover:bg-auralis-surface-container-low dark:hover:bg-white/5 transition-colors"
                                        >
                                            <XMarkIcon className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Tabs - Auralis Recessed Style */}
                                    <div className="flex p-1 bg-auralis-surface-container-low dark:bg-black/20 rounded-xl mb-6">
                                        <button
                                            onClick={() => setSelectedTab('desktop')}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${
                                                selectedTab === 'desktop'
                                                    ? 'bg-white dark:bg-auralis-inverse-surface text-primary-600 shadow-sm'
                                                    : 'text-auralis-on-surface-variant dark:text-gray-400 hover:text-auralis-on-surface dark:hover:text-white'
                                            }`}
                                        >
                                            <ComputerDesktopIcon className="w-4 h-4" />
                                            Ordinateur
                                        </button>
                                        <button
                                            onClick={() => setSelectedTab('mobile')}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${
                                                selectedTab === 'mobile'
                                                    ? 'bg-white dark:bg-auralis-inverse-surface text-primary-600 shadow-sm'
                                                    : 'text-auralis-on-surface-variant dark:text-gray-400 hover:text-auralis-on-surface dark:hover:text-white'
                                            }`}
                                        >
                                            <DevicePhoneMobileIcon className="w-4 h-4" />
                                            Mobile
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {filteredWallets.map((wallet) => (
                                            <button
                                                key={wallet.id}
                                                onClick={() => onConnect(wallet.id)}
                                                className="w-full flex items-center justify-between p-4 rounded-xl border border-auralis-surface-highest dark:border-auralis-on-surface-variant hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-all group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 p-2 border border-auralis-surface-highest dark:border-auralis-on-surface-variant group-hover:border-primary-200">
                                                        <img src={wallet.icon} alt={wallet.name} className="w-full h-full object-contain" />
                                                    </div>
                                                    <span className="font-bold text-auralis-on-surface dark:text-white">{wallet.name}</span>
                                                </div>
                                                <CheckCircleIcon className="w-5 h-5 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-8 p-4 bg-primary-50 dark:bg-primary-900/10 rounded-xl border border-primary-100 dark:border-primary-900/30">
                                        <p className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                                            Avez-vous besoin d'aide ?
                                        </p>
                                        <p className="text-xs text-primary-600/80 dark:text-primary-400/80 mt-1">
                                            Vérifiez que l'extension de votre portefeuille est installée et déverrouillée.
                                        </p>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
