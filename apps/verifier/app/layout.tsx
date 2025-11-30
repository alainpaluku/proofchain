import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'PROOFCHAIN Verifier',
    description: 'Verify academic diplomas on Cardano blockchain',
    manifest: '/manifest.json',
    themeColor: '#7c3aed',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'PROOFCHAIN',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
