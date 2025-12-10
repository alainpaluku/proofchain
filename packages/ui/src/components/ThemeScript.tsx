/**
 * PROOFCHAIN UI - Theme Script Component
 * Script inline pour éviter le flash de thème au chargement
 */

import React from 'react';

/**
 * Script inline qui s'exécute avant le rendu pour appliquer le thème
 * Évite le flash de thème clair avant l'application du thème sombre
 */
export function ThemeScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    (function() {
                        try {
                            const theme = localStorage.getItem('theme') || 'system';
                            if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                document.documentElement.classList.add('dark');
                            } else {
                                document.documentElement.classList.remove('dark');
                            }
                        } catch (e) {}
                    })();
                `,
            }}
        />
    );
}
