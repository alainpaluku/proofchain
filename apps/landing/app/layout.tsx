import type { Metadata } from 'next';
import { LanguageProvider, ThemeScript } from '@proofchain/ui';
import './globals.css';

export const metadata: Metadata = {
    title: 'PROOFCHAINS - Certification Académique sur Blockchain Cardano',
    description: 'PROOFCHAINS est la plateforme leader pour l\'émission et la vérification de diplômes numériques infalsifiables sur la blockchain Cardano. Sécurisez vos parcours académiques avec la technologie NFT.',
    keywords: ['blockchain', 'cardano', 'diplôme numérique', 'certification académique', 'NFT', 'vérification diplôme', 'RD Congo', 'éducation'],
    themeColor: '#0f172a',
    viewport: {
        width: 'device-width',
        initialScale: 1,
    },
    openGraph: {
        title: 'PROOFCHAINS - Certification Académique sur Blockchain',
        description: 'Émettez et vérifiez des diplômes infalsifiables sur Cardano.',
        type: 'website',
        locale: 'fr_FR',
        siteName: 'PROOFCHAINS',
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning>
            <head>
                <ThemeScript />
            </head>
            <body className="antialiased">
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </body>
        </html>
    );
}
