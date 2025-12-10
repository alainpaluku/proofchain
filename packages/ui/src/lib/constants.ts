/**
 * Shared UI Constants for PROOFCHAIN
 */

export const Z_INDEX = {
    base: 0,
    header: 30,
    sidebar: 40,
    floatingButton: 50,
    modalBackdrop: 100,
    modalContent: 101,
    toast: 200,
} as const;

export type FeatureColor = 'purple' | 'blue' | 'green' | 'red' | 'yellow' | 'indigo';

export interface ColorClasses {
    bg: string;
    text: string;
    iconBg: string;
    iconText: string;
    border: string;
    hover: string;
}

export const COLOR_MAP: Record<FeatureColor, ColorClasses> = {
    purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400',
        iconBg: 'bg-purple-100 dark:bg-purple-900/30',
        iconText: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800',
        hover: 'hover:bg-purple-200 dark:hover:bg-purple-900/50',
    },
    blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        iconText: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
        hover: 'hover:bg-blue-200 dark:hover:bg-blue-900/50',
    },
    green: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-600 dark:text-green-400',
        iconBg: 'bg-green-100 dark:bg-green-900/30',
        iconText: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800',
        hover: 'hover:bg-green-200 dark:hover:bg-green-900/50',
    },
    red: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-600 dark:text-red-400',
        iconBg: 'bg-red-100 dark:bg-red-900/30',
        iconText: 'text-red-600 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800',
        hover: 'hover:bg-red-200 dark:hover:bg-red-900/50',
    },
    yellow: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-600 dark:text-yellow-400',
        iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
        iconText: 'text-yellow-600 dark:text-yellow-400',
        border: 'border-yellow-200 dark:border-yellow-800',
        hover: 'hover:bg-yellow-200 dark:hover:bg-yellow-900/50',
    },
    indigo: {
        bg: 'bg-indigo-100 dark:bg-indigo-900/30',
        text: 'text-indigo-600 dark:text-indigo-400',
        iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
        iconText: 'text-indigo-600 dark:text-indigo-400',
        border: 'border-indigo-200 dark:border-indigo-800',
        hover: 'hover:bg-indigo-200 dark:hover:bg-indigo-900/50',
    },
};

export const TOUCH_TARGET_SIZE = 44;

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const;

export const ANIMATION = {
    fast: 150,
    normal: 200,
    slow: 300,
} as const;
