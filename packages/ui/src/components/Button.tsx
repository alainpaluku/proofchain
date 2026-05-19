/**
 * PROOFCHAIN UI - Button Component
 * Auralis System - Precision tools style
 */

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ElementType;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    fullWidth?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    loading = false,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900';

    // Auralis: Interactive elements use a tighter radius (8px-12px)
    const roundedClass = 'rounded-lg'; // 8px
    
    const variantClasses = {
        // Primary buttons are solid #111111 (mapped to primary-900/black) with #FCFCFB text
        primary: 'bg-primary-900 dark:bg-primary-600 text-white hover:bg-black dark:hover:bg-primary-500 active:scale-[0.98]',
        // Secondary buttons use #E7E7E4 (surface-highest) border with no fill or subtle fill
        secondary: 'bg-auralis-surface-container-high dark:bg-auralis-inverse-surface hover:bg-auralis-surface-highest dark:hover:bg-gray-700 text-auralis-on-surface dark:text-white',
        outline: 'border border-auralis-outline-variant dark:border-auralis-on-surface-variant hover:bg-auralis-surface-container-low dark:hover:bg-white/5 text-auralis-on-surface dark:text-white',
        ghost: 'hover:bg-auralis-surface-container-low dark:hover:bg-white/5 text-auralis-on-surface-variant dark:text-gray-300',
        danger: 'bg-error dark:bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]'
    };
    
    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-lg'
    };
    
    const widthClass = fullWidth ? 'w-full' : '';
    const disabledClass = (disabled || loading) ? 'opacity-40 cursor-not-allowed grayscale' : '';
    
    return (
        <button
            className={`${baseClasses} ${roundedClass} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{children}</span>
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
                    <span>{children}</span>
                    {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
                </>
            )}
        </button>
    );
}
