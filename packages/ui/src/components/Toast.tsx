'use client';

import React from 'react';
import { XMarkIcon, InformationCircleIcon, CheckCircleIcon, ExclamationTriangleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
    message: string;
    type?: ToastType;
    onClose?: () => void;
    duration?: number;
}

export function Toast({
    message,
    type = 'info',
    onClose,
    duration = 5000,
}: ToastProps) {
    React.useEffect(() => {
        if (duration > 0 && onClose) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const typeClasses = {
        success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
        error: 'bg-error-container/30 border-error/20 text-error',
        info: 'bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800 text-primary-800 dark:text-primary-300',
        warning: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300',
    };

    const icons = {
        success: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
        error: <ExclamationCircleIcon className="w-5 h-5 text-error" />,
        info: <InformationCircleIcon className="w-5 h-5 text-primary-500" />,
        warning: <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />,
    };

    return (
        <div className={`flex items-center gap-3 p-4 rounded-lg border shadow-sm backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-300 ${typeClasses[type]}`}>
            <div className="flex-shrink-0">
                {icons[type]}
            </div>
            <p className="text-sm font-semibold">{message}</p>
            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-auto p-1 rounded-md hover:bg-black/5 transition-colors"
                    aria-label="Fermer"
                >
                    <XMarkIcon className="w-4 h-4 opacity-50 hover:opacity-100" />
                </button>
            )}
        </div>
    );
}
