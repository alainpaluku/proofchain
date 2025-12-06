/**
 * PROOFCHAIN - Shared Package Index
 * Export all shared utilities, hooks, types, and services
 */

// Types
export * from './types';

// Contexts
export { AppProvider, useApp } from './contexts/AppContext';

// Hooks
export { useAsync } from './hooks/useAsync';
export { useForm } from './hooks/useForm';
export { usePagination } from './hooks/usePagination';
export { useLocalStorage } from './hooks/useLocalStorage';
export { useDebounce } from './hooks/useDebounce';
export { useDebounceCallback } from './hooks/useDebounceCallback';
export { useMediaQuery, useIsMobile, useIsTablet, useIsDesktop, useIsDarkMode } from './hooks/useMediaQuery';

// Services
export { api } from './services/api';
export { diplomaService } from './services/diploma.service';
export { institutionService } from './services/institution.service';
export { statsService } from './services/stats.service';

// Utils
export * from './utils/format';
export * from './utils/validation';
