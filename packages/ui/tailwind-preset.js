/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Auralis System Colors
        auralis: {
          surface: '#fdf8f8',
          'surface-dim': '#ddd9d8',
          'surface-bright': '#fdf8f8',
          'surface-container-lowest': '#ffffff',
          'surface-container-low': '#f7f3f2',
          'surface-container': '#f1edec',
          'surface-container-high': '#ebe7e6',
          'surface-container-highest': '#e5e2e1',
          'on-surface': '#1c1b1b',
          'on-surface-variant': '#444748',
          'outline': '#747878',
          'outline-variant': '#c4c7c7',
          background: '#fdf8f8',
          'on-background': '#1c1b1b',
          'inverse-surface': '#313030',
          'inverse-on-surface': '#f4f0ef',
          'surface-variant': '#e5e2e1',
          'surface-tint': '#5f5e5e',
        },
        primary: {
          // Enterprise Blue palette
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          DEFAULT: '#2563eb',
        },
        secondary: {
          DEFAULT: '#5e5e5e',
          container: '#e1dfdf',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        }
      },
      fontFamily: {
        sans: [
          'Saira',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
        saira: ['Saira', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '1.75rem', // For the 28px mentioned
      },
      spacing: {
        'max-width': '1280px',
        'gutter': '32px',
        'section-min': '140px',
        'section-max': '180px',
      }
    },
  },
  plugins: [],
};
