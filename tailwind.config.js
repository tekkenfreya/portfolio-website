/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/context/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#00b4d8',
          600: '#0077b6',
          700: '#005577',
        },
        dark: {
          bg: '#0d0d1a',
          surface: '#1a1a2e',
          elevated: '#16213e',
          border: '#2d3561',
        },
        accent: {
          red: '#ef4444',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          violet: '#6366f1',
          ice: '#e0f2fe',
          silver: '#f1f5f9',
        },
        gojo: {
          red: '#ef4444',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          void: '#1e1b4b',
          ice: '#e0f2fe',
          silver: '#f1f5f9',
          dark: '#0f0f23',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dark-gradient': 'linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 50%, #16213e 100%)',
        'light-gradient': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f1f5f9 100%)',
        'gojo-gradient': 'linear-gradient(135deg, #ef4444 0%, #3b82f6 50%, #8b5cf6 100%)',
        'infinity-gradient': 'linear-gradient(45deg, #ef4444 0%, #3b82f6 50%, #8b5cf6 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}