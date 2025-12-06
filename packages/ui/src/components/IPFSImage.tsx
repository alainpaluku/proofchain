'use client';

import React, { useState, useEffect } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';

interface IPFSImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackText?: string;
    onLoad?: () => void;
    onError?: () => void;
}

type ImageLoadState = 'loading' | 'loaded' | 'error';

export function IPFSImage({
    src,
    alt,
    className = '',
    fallbackText,
    onLoad,
    onError
}: IPFSImageProps) {
    const [loadState, setLoadState] = useState<ImageLoadState>('loading');
    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 2;

    useEffect(() => {
        setLoadState('loading');
        setRetryCount(0);
    }, [src]);

    const handleLoad = () => {
        setLoadState('loaded');
        onLoad?.();
    };

    const handleError = () => {
        if (retryCount < MAX_RETRIES) {
            setTimeout(() => {
                setRetryCount(prev => prev + 1);
                setLoadState('loading');
            }, 1000 * (retryCount + 1));
        } else {
            setLoadState('error');
            onError?.();
        }
    };

    const handleRetry = () => {
        setRetryCount(0);
        setLoadState('loading');
    };

    if (loadState === 'error') {
        return (
            <div className={`flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-8 ${className}`}>
                <ImageOff className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-center mb-2">
                    {fallbackText || 'Image non disponible'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 text-center mb-4">
                    L'image pourrait être en cours de chargement sur IPFS
                </p>
                <button
                    onClick={handleRetry}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                    aria-label="Réessayer de charger l'image"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            {loadState === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Chargement de l'image...
                        </p>
                    </div>
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-contain ${loadState === 'loading' ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onLoad={handleLoad}
                onError={handleError}
                loading="lazy"
            />
        </div>
    );
}
