/**
 * PROOFCHAIN UI - Toast Component
 * Composant de notification toast
 */

'use client';

import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    duration?: number;
    onClose: () => void;
}

export function Toast({ type, message, duration = 5000, onClose }: ToastProps) {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const icons = {
        success: CheckCircle,
        error: AlertCircle,
        info: Info,
        warning: AlertCircle,
    };

    const colors = {
        success: 'bg-green-50 dark:bg-green-900/30 border-green-500 text-green-900 dark:text-green-100',
        error: 'bg-red-50 dark:bg-red-900/30 border-red-500 text-red-900 dark:text-red-100',
        info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-900 dark:text-blue-100',
        warning: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-500 text-yellow-900 dark:text-yellow-100',
    };

    const Icon = icons[type];

    return (
        <div
            className={`flex items-center gap-3 p-4 rounded-xl border-l-4 shadow-lg ${colors[type]} animate-slide-in`}
            role="alert"
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Fermer"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

// Toast Container
export interface ToastContainerProps {
    toasts: Array<ToastProps & { id: string }>;
    onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    return (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    type={toast.type}
                    message={toast.message}
                    duration={toast.duration}
                    onClose={() => onRemove(toast.id)}
                />
            ))}
        </div>
    );
}
