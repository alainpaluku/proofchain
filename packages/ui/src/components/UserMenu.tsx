'use client';

import React from 'react';
import { UserIcon, ArrowLeftOnRectangleIcon, Cog8ToothIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { useTranslation } from '../contexts/LanguageContext';

export interface UserMenuProps {
    user: {
        name?: string;
        email: string;
        avatar?: string;
    };
    onSignOut: () => void;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
}

export function UserMenu({ user, onSignOut, onProfileClick, onSettingsClick }: UserMenuProps) {
    const { t } = useTranslation();

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 p-1 rounded-full hover:bg-proofchains-surface-container-low dark:hover:bg-white/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500">
                <div className="w-9 h-9 rounded-full bg-primary-900 flex items-center justify-center text-white text-sm font-bold shadow-sm border border-white/10">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.name || user.email} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        (user.name || user.email).charAt(0).toUpperCase()
                    )}
                </div>
                <div className="hidden sm:block text-left mr-1">
                    <p className="text-sm font-bold text-proofchains-on-surface dark:text-white leading-tight">{user.name}</p>
                    <p className="text-[10px] label-caps text-proofchains-on-surface-variant dark:text-gray-400">Admin</p>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-proofchains-outline" />
            </Menu.Button>

            <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-proofchains-inverse-surface border border-proofchains-surface-highest dark:border-proofchains-on-surface-variant rounded-xl shadow py-2 z-50 focus:outline-none">
                    <div className="px-4 py-3 border-b border-proofchains-surface-highest dark:border-proofchains-on-surface-variant mb-1">
                        <p className="text-xs label-caps text-proofchains-on-surface-variant dark:text-gray-500 mb-1">Connecté en tant que</p>
                        <p className="text-sm font-bold text-proofchains-on-surface dark:text-white truncate">{user.email}</p>
                    </div>

                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={onProfileClick}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                                    active ? 'bg-proofchains-surface-container-low dark:bg-white/5 text-primary-600 dark:text-primary-400' : 'text-proofchains-on-surface dark:text-gray-300'
                                }`}
                            >
                                <UserIcon className="w-5 h-5 opacity-60" />
                                <span className="font-semibold">Mon Profil</span>
                            </button>
                        )}
                    </Menu.Item>

                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={onSettingsClick}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                                    active ? 'bg-proofchains-surface-container-low dark:bg-white/5 text-primary-600 dark:text-primary-400' : 'text-proofchains-on-surface dark:text-gray-300'
                                }`}
                            >
                                <Cog8ToothIcon className="w-5 h-5 opacity-60" />
                                <span className="font-semibold">Paramètres</span>
                            </button>
                        )}
                    </Menu.Item>

                    <div className="my-1 border-t border-proofchains-surface-highest dark:border-proofchains-on-surface-variant" />

                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={onSignOut}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                                    active ? 'bg-red-50 dark:bg-red-900/10 text-red-600' : 'text-red-500'
                                }`}
                            >
                                <ArrowLeftOnRectangleIcon className="w-5 h-5 opacity-60" />
                                <span className="font-bold">Déconnexion</span>
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
