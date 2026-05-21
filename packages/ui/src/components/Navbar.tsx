/**
 * PROOFCHAIN - Navbar Component
 * Auralis System - Clean & Centered navigation
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';

export interface NavItem {
    label: string;
    href: string;
}

export interface NavbarProps {
    logo: React.ReactNode;
    items: NavItem[];
    action?: React.ReactNode;
}

export function Navbar({ logo, items, action }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/80 dark:bg-auralis-inverse-surface/80 backdrop-blur-md py-3 shadow-sm border-b border-auralis-surface-highest dark:border-auralis-on-surface-variant'
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-max-width mx-auto px-gutter flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    {logo}
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-bold text-auralis-on-surface-variant dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 pl-6 border-l border-auralis-surface-highest dark:border-auralis-on-surface-variant">
                        <LanguageSelector />
                        <ThemeToggle />
                        {action && <div className="ml-2">{action}</div>}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-auralis-on-surface dark:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-auralis-inverse-surface border-b border-auralis-surface-highest dark:border-auralis-on-surface-variant p-6 space-y-6 animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col gap-4">
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-lg font-bold text-auralis-on-surface dark:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 pt-6 border-t border-auralis-surface-highest dark:border-auralis-on-surface-variant">
                        <div className="flex items-center justify-between">
                            <span className="label-caps text-auralis-on-surface-variant">Langue</span>
                            <LanguageSelector />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="label-caps text-auralis-on-surface-variant">Thème</span>
                            <ThemeToggle />
                        </div>
                        {action && <div className="pt-2">{action}</div>}
                    </div>
                </div>
            )}
        </nav>
    );
}
