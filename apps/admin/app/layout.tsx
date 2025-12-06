import type { Metadata, Viewport } from 'next';
import './globals.css';
import AppLayout from '../components/AppLayout';

export const metadata: Metadata = {
    title: 'PROOFCHAIN Admin',
    description: 'Administration platform for PROOFCHAIN',
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
