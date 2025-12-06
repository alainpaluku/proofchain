import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'PROOFCHAIN Issuer',
    description: 'Issue academic diplomas as NFTs on Cardano',
    manifest: '/manifest.json',
};

export const viewport: Viewport = {
    themeColor: '#7c3aed',
};

import AppLayout from '../components/AppLayout';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                const theme = localStorage.getItem('theme') || 'system';
                                if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                    document.documentElement.classList.add('dark');
                                }
                            })();
                        `,
                    }}
                />
            </head>
            <body className="antialiased">
                <AppLayout>
                    {children}
                </AppLayout>
            </body>
        </html>
    );
}
