'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode } from 'lucide-react';
import QRScannerModal from './QRScannerModal';

export default function FloatingScanner() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleScan = (result: string) => {
        // Rediriger vers la page de vérification avec le résultat
        router.push(`/verify/${encodeURIComponent(result)}`);
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 z-40 p-4 min-w-[56px] min-h-[56px] bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110 active:scale-95 group"
                aria-label="Scanner un QR Code"
                title="Scanner un QR Code"
            >
                <QrCode className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            </button>

            <QRScannerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onScan={handleScan}
            />
        </>
    );
}
