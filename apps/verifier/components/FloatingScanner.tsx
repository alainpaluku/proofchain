'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { QrCode } from 'lucide-react';

export default function FloatingScanner() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push('/scan')}
            className="fixed bottom-6 right-6 z-50 p-4 md:p-4 min-w-[44px] min-h-[44px] bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110 group"
            aria-label="Scanner un QR Code"
            title="Scanner un QR Code"
        >
            <QrCode className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        </button>
    );
}
