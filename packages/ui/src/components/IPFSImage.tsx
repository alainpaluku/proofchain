'use client';

import React from 'react';
import { PhotoIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

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
    const [loadState, setLoadState] = React.useState<ImageLoadState>('loading');
    const [retryCount, setRetryCount] = React.useState(0);
    const MAX_RETRIES = 2;

    React.useEffect(() => {
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
            <div className={`flex flex-col items-center justify-center bg-proofchains-surface-container-low dark:bg-black/20 p-8 rounded-xl border border-proofchains-surface-highest dark:border-proofchains-on-surface-variant ${className}`}>
                <PhotoIcon className="w-16 h-16 text-proofchains-outline opacity-30 mb-4" />
                <p className="text-proofchains-on-surface dark:text-white font-bold text-center mb-1">
                    {fallbackText || 'Image non disponible'}
                </p>
                <p className="text-xs text-proofchains-on-surface-variant dark:text-gray-500 text-center mb-6">
                    L'image pourrait être en cours de chargement sur IPFS
                </p>
                <button
                    onClick={handleRetry}
                    className="flex items-center gap-2 px-6 py-2 bg-primary-900 dark:bg-primary-600 text-white rounded-lg text-sm font-bold transition-all  "
                >
                    <ArrowPathIcon className="w-4 h-4" />
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden rounded-xl bg-proofchains-surface-container-low dark:bg-black/20 ${className}`}>
            {loadState === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <ArrowPathIcon className="w-10 h-10 text-primary-600 animate-spin" />
                        <p className="label-caps text-proofchains-on-surface-variant dark:text-gray-500">
                            IPFS LOAD...
                        </p>
                    </div>
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-contain ${loadState === 'loading' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-700`}
                onLoad={handleLoad}
                onError={handleError}
                loading="lazy"
            />
        </div>
    );
}
