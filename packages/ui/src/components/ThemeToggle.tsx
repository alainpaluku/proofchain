'use client';

import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-lg bg-auralis-surface-container-low dark:bg-white/5 border border-auralis-surface-highest dark:border-auralis-on-surface-variant " />;
  }

  const themes = [
    { id: 'light', name: 'Clair', icon: SunIcon },
    { id: 'dark', name: 'Sombre', icon: MoonIcon },
    { id: 'system', name: 'Système', icon: ComputerDesktopIcon },
  ];

  const CurrentIcon = themes.find(t => t.id === theme)?.icon || ComputerDesktopIcon;

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-auralis-inverse-surface border border-auralis-surface-highest dark:border-auralis-on-surface-variant text-auralis-on-surface dark:text-white hover:bg-auralis-surface-container-low dark:hover:bg-white/5 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Changer le thème"
      >
        <CurrentIcon className="w-5 h-5" />
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
        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white dark:bg-auralis-inverse-surface border border-auralis-surface-highest dark:border-auralis-on-surface-variant rounded-xl shadow py-1.5 z-50 focus:outline-none">
          {themes.map((t) => (
            <Menu.Item key={t.id}>
              {({ active }) => (
                <button
                  onClick={() => setTheme(t.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold transition-colors ${
                    active ? 'bg-auralis-surface-container-low dark:bg-white/5 text-primary-600 dark:text-primary-400' : 'text-auralis-on-surface dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <t.icon className="w-4 h-4 opacity-70" />
                    {t.name}
                  </div>
                  {theme === t.id && <CheckIcon className="w-4 h-4 text-primary-500" />}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
