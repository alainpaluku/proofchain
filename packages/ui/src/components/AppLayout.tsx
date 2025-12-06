'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { Sidebar, type SidebarItem } from './Sidebar';
import { NotificationButton } from './NotificationButton';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';

/**
 * Props for the AppLayout component
 */
export interface AppLayoutProps {
    /** Page content to render */
    children: React.ReactNode;
    /** Menu items for the sidebar */
    menuItems: SidebarItem[];
    /** Logo component to display in sidebar */
    logo: React.ReactNode;
    /** Additional content to display in header (optional) */
    additionalHeaderContent?: React.ReactNode;
    /** Whether to show sidebar toggle button (default: true) */
    showSidebarToggle?: boolean;
    /** Initial sidebar collapsed state (default: false) */
    initialSidebarCollapsed?: boolean;
    /** Callback when sidebar state changes */
    onSidebarToggle?: (collapsed: boolean) => void;
}

/**
 * Main application layout component with sidebar, header, and content area
 * 
 * Features:
 * - Responsive sidebar (collapsible on desktop, overlay on mobile)
 * - Sticky header with notifications
 * - Configurable logo and menu items
 * - Accessibility compliant (WCAG 2.1 AA)
 * - Dark mode support
 * 
 * @example
 * ```tsx
 * <AppLayout
 *   menuItems={menuItems}
 *   logo={<Logo />}
 *   showSidebarToggle={true}
 * >
 *   <YourPageContent />
 * </AppLayout>
 * ```
 */
export function AppLayout({ 
    children, 
    menuItems, 
    logo,
    additionalHeaderContent,
    showSidebarToggle = true,
    initialSidebarCollapsed = false,
    onSidebarToggle
}: AppLayoutProps) {
    // Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Desktop sidebar collapsed state
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(initialSidebarCollapsed);

    // Load sidebar state from localStorage on mount
    useEffect(() => {
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState !== null) {
            setIsSidebarCollapsed(savedState === 'true');
        }
    }, []);

    // Toggle mobile menu
    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    // Close mobile menu
    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    // Toggle desktop sidebar
    const toggleSidebar = useCallback(() => {
        setIsSidebarCollapsed(prev => {
            const newState = !prev;
            // Save to localStorage
            localStorage.setItem('sidebarCollapsed', String(newState));
            // Call callback if provided
            onSidebarToggle?.(newState);
            return newState;
        });
    }, [onSidebarToggle]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] flex">
            {/* Desktop Sidebar */}
            <div 
                className={`hidden md:block transition-all duration-300 ${
                    isSidebarCollapsed ? 'w-20' : 'w-64'
                }`}
            >
                <Sidebar 
                    items={menuItems} 
                    logo={logo}
                    collapsed={isSidebarCollapsed}
                />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={closeMobileMenu}
                        aria-hidden="true"
                    />
                    {/* Sidebar */}
                    <div className="fixed inset-y-0 left-0 z-50 md:hidden">
                        <Sidebar 
                            items={menuItems} 
                            logo={logo}
                            onClose={closeMobileMenu}
                        />
                    </div>
                </>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
                    <div className="px-4 md:px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden p-2 min-w-[44px] min-h-[44px] rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                                aria-expanded={isMobileMenuOpen}
                            >
                                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            </button>

                            {/* Desktop Sidebar Toggle */}
                            {showSidebarToggle && (
                                <button
                                    onClick={toggleSidebar}
                                    className="hidden md:flex p-2 min-w-[44px] min-h-[44px] rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    aria-label={isSidebarCollapsed ? 'Ouvrir la sidebar' : 'Fermer la sidebar'}
                                    title={isSidebarCollapsed ? 'Ouvrir la sidebar' : 'Fermer la sidebar'}
                                >
                                    {isSidebarCollapsed ? (
                                        <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                    ) : (
                                        <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                    )}
                                </button>
                            )}

                            {/* Additional Header Content */}
                            {additionalHeaderContent}
                        </div>

                        {/* Header Actions */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <LanguageSelector variant="icon" />
                            <ThemeToggle />
                            <NotificationButton />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
