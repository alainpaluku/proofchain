/**
 * PROOFCHAIN - UI Package Index
 * Export all shared components and hooks
 */

// Components
export { ConnectWalletButton } from './components/ConnectWalletButton';
export { InstitutionCard } from './components/InstitutionCard';
export { Sidebar } from './components/Sidebar';
export { LanguageSelector } from './components/LanguageSelector';
export { ThemeToggle } from './components/ThemeToggle';

// Hooks
export { useWallet } from './hooks/useWallet';
export { useI18n } from './hooks/useI18n';
export { useTheme } from './hooks/useTheme';

// Types
export type { WalletState } from './hooks/useWallet';
export type { Language } from './hooks/useI18n';
export type { Theme } from './hooks/useTheme';
export type { SidebarItem } from './components/Sidebar';
