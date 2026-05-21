/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // PROOFCHAINS Brand Colors
        proofchains: {
          // Light Theme (Soft Industrial / Warm Neutral)
          surface: '#F7F7F5',
          'surface-dim': '#E7E7E4',
          'surface-bright': '#FFFFFF',
          'surface-container-lowest': '#FFFFFF',
          'surface-container-low': '#F2F2F0',
          'surface-container': '#E7E7E4',
          'surface-container-high': '#DDDDDA',
          'surface-container-highest': '#D2D2CF',
          'on-surface': '#1C1C1A',
          'on-surface-variant': '#444748',
          'outline': '#747878',
          'outline-variant': '#c4c7c7',
          background: '#fdf8f8',
          'on-background': '#1c1b1b',

          // Dark Theme (Deep Industrial / Inspired by reference)
          'inverse-surface': '#0B0F14', // Deep background
          'inverse-on-surface': '#F7F7F5',
          'surface-variant': '#111820', // Card background in dark mode
          'surface-tint': '#2563eb',

          // Semantic mappings for harmonization
          'dark-border': 'rgba(255, 255, 255, 0.1)',
          'dark-card': '#111820',
          'dark-bg': '#0B0F14',
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
          950: '#0f172a',
          DEFAULT: '#3b82f6',
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
        'xl': '1.5rem', // 24px
        '2xl': '1.75rem', // 28px
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
