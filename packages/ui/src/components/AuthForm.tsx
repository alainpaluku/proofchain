'use client';

import React, { useState } from 'react';
import { EnvelopeIcon, LockClosedIcon, UserIcon, EyeIcon, EyeSlashIcon, ArrowPathIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { useTranslation } from '../contexts/LanguageContext';
import { Button } from './Button';
import { Card } from './Card';

export type AuthMode = 'login' | 'register' | 'forgot-password';

export interface AuthFormProps {
    mode?: AuthMode;
    onSubmit: (data: AuthFormData) => Promise<{ success: boolean; error?: { message: string } }>;
    onModeChange?: (mode: AuthMode) => void;
    loading?: boolean;
    logo?: React.ReactNode;
    title?: string;
    subtitle?: string;
}

export interface AuthFormData {
    email: string;
    password: string;
    name?: string;
    mode: AuthMode;
}

export function AuthForm({ 
    mode: initialMode = 'login', 
    onSubmit, 
    onModeChange,
    loading: externalLoading,
    logo,
    title,
    subtitle
}: AuthFormProps) {
    const { t } = useTranslation();
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const isLoading = externalLoading ?? loading;

    const handleModeChange = (newMode: AuthMode) => {
        setMode(newMode);
        setError(null);
        setSuccess(null);
        onModeChange?.(newMode);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const result = await onSubmit({ email, password, name, mode });
            
            if (!result.success && result.error) {
                setError(result.error.message);
            } else if (result.success) {
                if (mode === 'register') {
                    setSuccess(t('common', 'success'));
                } else if (mode === 'forgot-password') {
                    setSuccess(t('common', 'success'));
                }
            }
        } catch (err) {
            setError(t('common', 'error'));
        } finally {
            setLoading(false);
        }
    };

    const getTitle = () => {
        if (title) return title;
        switch (mode) {
            case 'login': return t('auth', 'login');
            case 'register': return t('auth', 'register');
            case 'forgot-password': return t('auth', 'forgotPassword');
        }
    };

    const getSubtitle = () => {
        if (subtitle) return subtitle;
        switch (mode) {
            case 'login': return t('auth', 'login');
            case 'register': return t('auth', 'register');
            case 'forgot-password': return t('auth', 'forgotPassword');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-auralis-surface dark:bg-auralis-inverse-surface p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                {logo && (
                    <div className="flex justify-center mb-10">
                        {logo}
                    </div>
                )}

                {/* Auralis Card */}
                <Card variant="default" padding="xl" className="shadow-sm">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-auralis-on-surface dark:text-white mb-3">
                            {getTitle()}
                        </h1>
                        <p className="body-md text-auralis-on-surface-variant dark:text-gray-400">
                            {getSubtitle()}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-error-container/30 border border-error/20 rounded-lg flex items-start gap-3">
                            <ExclamationTriangleIcon className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-error font-medium">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-green-700 dark:text-green-400 font-medium">{success}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field (Register only) */}
                        {mode === 'register' && (
                            <div>
                                <label htmlFor="name" className="label-caps block text-auralis-on-surface-variant dark:text-gray-300 mb-2.5">
                                    {t('common', 'name')}
                                </label>
                                <div className="relative group">
                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-auralis-outline group-focus-within:text-primary-600 transition-colors" />
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={t('auth', 'namePlaceholder')}
                                        className="w-full pl-12 pr-4 py-3 bg-auralis-surface-container-low dark:bg-white/5 border border-auralis-outline-variant dark:border-auralis-on-surface-variant rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-auralis-on-surface dark:text-white placeholder-auralis-outline"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="label-caps block text-auralis-on-surface-variant dark:text-gray-300 mb-2.5">
                                {t('common', 'email')}
                            </label>
                            <div className="relative group">
                                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-auralis-outline group-focus-within:text-primary-600 transition-colors" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('auth', 'emailPlaceholder')}
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-auralis-surface-container-low dark:bg-white/5 border border-auralis-outline-variant dark:border-auralis-on-surface-variant rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-auralis-on-surface dark:text-white placeholder-auralis-outline"
                                />
                            </div>
                        </div>

                        {/* Password Field (Not for forgot-password) */}
                        {mode !== 'forgot-password' && (
                            <div>
                                <label htmlFor="password" className="label-caps block text-auralis-on-surface-variant dark:text-gray-300 mb-2.5">
                                    {t('auth', 'password')}
                                </label>
                                <div className="relative group">
                                    <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-auralis-outline group-focus-within:text-primary-600 transition-colors" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                        className="w-full pl-12 pr-12 py-3 bg-auralis-surface-container-low dark:bg-white/5 border border-auralis-outline-variant dark:border-auralis-on-surface-variant rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-auralis-on-surface dark:text-white placeholder-auralis-outline"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-auralis-outline hover:text-auralis-on-surface dark:hover:text-white transition-colors"
                                        aria-label={showPassword ? t('common', 'hide') : t('common', 'show')}
                                    >
                                        {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Forgot Password Link (Login only) */}
                        {mode === 'login' && (
                            <div className="text-right">
                                <button
                                    type="button"
                                    onClick={() => handleModeChange('forgot-password')}
                                    className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                                >
                                    {t('auth', 'forgotPassword')}
                                </button>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            loading={isLoading}
                            fullWidth
                            variant="primary"
                            size="lg"
                        >
                            {mode === 'login' && t('auth', 'login')}
                            {mode === 'register' && t('auth', 'register')}
                            {mode === 'forgot-password' && t('common', 'confirm')}
                        </Button>
                    </form>

                    {/* Mode Switch */}
                    <div className="mt-8 text-center text-sm">
                        <span className="text-auralis-on-surface-variant dark:text-gray-400">
                            {mode === 'login' && `${t('auth', 'noAccount')} `}
                            {mode === 'register' && `${t('auth', 'alreadyRegistered')} `}
                            {mode === 'forgot-password' && `${t('auth', 'backTo')} `}
                        </span>
                        <button
                            onClick={() => {
                                if (mode === 'login') handleModeChange('register');
                                else handleModeChange('login');
                            }}
                            className="text-primary-600 dark:text-primary-400 font-bold hover:underline"
                        >
                            {mode === 'login' && t('auth', 'register')}
                            {mode === 'register' && t('auth', 'login')}
                            {mode === 'forgot-password' && t('auth', 'login')}
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
