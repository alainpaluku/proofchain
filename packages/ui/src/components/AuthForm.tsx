'use client';

import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

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
                    setSuccess('Compte créé ! Vérifiez votre email pour confirmer votre inscription.');
                } else if (mode === 'forgot-password') {
                    setSuccess('Email de réinitialisation envoyé ! Vérifiez votre boîte de réception.');
                }
            }
        } catch (err) {
            setError('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const getTitle = () => {
        if (title) return title;
        switch (mode) {
            case 'login': return 'Connexion';
            case 'register': return 'Créer un compte';
            case 'forgot-password': return 'Mot de passe oublié';
        }
    };

    const getSubtitle = () => {
        if (subtitle) return subtitle;
        switch (mode) {
            case 'login': return 'Connectez-vous à votre compte';
            case 'register': return 'Créez votre compte pour commencer';
            case 'forgot-password': return 'Entrez votre email pour réinitialiser votre mot de passe';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                {logo && (
                    <div className="flex justify-center mb-8">
                        {logo}
                    </div>
                )}

                {/* Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {getTitle()}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {getSubtitle()}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field (Register only) */}
                        {mode === 'register' && (
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nom complet
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Jean Dupont"
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="vous@exemple.com"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* Password Field (Not for forgot-password) */}
                        {mode !== 'forgot-password' && (
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                        className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {mode === 'register' && (
                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        Minimum 6 caractères
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Forgot Password Link (Login only) */}
                        {mode === 'login' && (
                            <div className="text-right">
                                <button
                                    type="button"
                                    onClick={() => handleModeChange('forgot-password')}
                                    className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                                >
                                    Mot de passe oublié ?
                                </button>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Chargement...
                                </>
                            ) : (
                                <>
                                    {mode === 'login' && 'Se connecter'}
                                    {mode === 'register' && 'Créer mon compte'}
                                    {mode === 'forgot-password' && 'Envoyer le lien'}
                                </>
                            )}
                        </button>
                    </form>

                    {/* Mode Switch */}
                    <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        {mode === 'login' && (
                            <>
                                Pas encore de compte ?{' '}
                                <button
                                    onClick={() => handleModeChange('register')}
                                    className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                                >
                                    S'inscrire
                                </button>
                            </>
                        )}
                        {mode === 'register' && (
                            <>
                                Déjà un compte ?{' '}
                                <button
                                    onClick={() => handleModeChange('login')}
                                    className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                                >
                                    Se connecter
                                </button>
                            </>
                        )}
                        {mode === 'forgot-password' && (
                            <button
                                onClick={() => handleModeChange('login')}
                                className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                            >
                                Retour à la connexion
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
