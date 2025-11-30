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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
