'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, Camera, AlertCircle, RefreshCw } from 'lucide-react';

interface QRScannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onScan: (result: string) => void;
}

export default function QRScannerModal({ isOpen, onClose, onScan }: QRScannerModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const startCamera = async () => {
        setError(null);
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { 
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                await videoRef.current.play();
                setStream(mediaStream);
                setIsScanning(true);
                startScanning();
            }
        } catch (err) {
            console.error('Camera error:', err);
            if (err instanceof Error) {
                if (err.name === 'NotAllowedError') {
                    setError('Accès à la caméra refusé. Veuillez autoriser l\'accès.');
                } else if (err.name === 'NotFoundError') {
                    setError('Aucune caméra détectée sur cet appareil.');
                } else {
                    setError('Erreur caméra: ' + err.message);
                }
            }
        }
    };

    const stopCamera = () => {
        if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current);
            scanIntervalRef.current = null;
        }
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setIsScanning(false);
    };

    const startScanning = () => {
        if (scanIntervalRef.current) return;
        
        scanIntervalRef.current = setInterval(() => {
            scanQRCode();
        }, 200);
    };

    const scanQRCode = async () => {
        if (!videoRef.current || !canvasRef.current || !isScanning) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if (!ctx || video.readyState !== video.HAVE_ENOUGH_DATA) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        try {
            // Use BarcodeDetector API if available (modern browsers)
            if ('BarcodeDetector' in window) {
                const barcodeDetector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
                const barcodes = await barcodeDetector.detect(canvas);
                if (barcodes.length > 0) {
                    handleScanSuccess(barcodes[0].rawValue);
                }
            }
        } catch (err) {
            // BarcodeDetector not supported, continue scanning
        }
    };

    const handleScanSuccess = (result: string) => {
        stopCamera();
        onScan(result);
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            startCamera();
        } else {
            stopCamera();
        }

        return () => {
            stopCamera();
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Camera className="w-5 h-5 text-purple-600" />
                        Scanner QR Code
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                        aria-label="Fermer"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Scanner Area */}
                <div className="relative aspect-square bg-black">
                    {error ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                            <p className="text-white mb-4">{error}</p>
                            <button
                                onClick={startCamera}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Réessayer
                            </button>
                        </div>
                    ) : (
                        <>
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                playsInline
                                muted
                            />
                            <canvas ref={canvasRef} className="hidden" />
                            
                            {/* Scan overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="relative w-64 h-64">
                                    {/* Corner markers */}
                                    <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-purple-500 rounded-tl-xl" />
                                    <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-purple-500 rounded-tr-xl" />
                                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-purple-500 rounded-bl-xl" />
                                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-purple-500 rounded-br-xl" />
                                    
                                    {/* Scanning line animation */}
                                    <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-scan" />
                                </div>
                            </div>

                            {/* Loading indicator */}
                            {!isScanning && !error && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800">
                    <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Placez le QR code dans le cadre pour le scanner
                    </p>
                </div>
            </div>

            {/* CSS for scan animation */}
            <style jsx>{`
                @keyframes scan {
                    0%, 100% { top: 10%; }
                    50% { top: 90%; }
                }
                .animate-scan {
                    animation: scan 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
