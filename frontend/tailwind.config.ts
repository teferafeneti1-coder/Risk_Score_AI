import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-cyan': '#00f5ff',
        'brand-bg': '#000000',
        'band-very-low': '#22c55e',
        'band-low': '#84cc16',
        'band-medium': '#f59e0b',
        'band-high': '#ef4444',
        'band-very-high': '#dc2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['"Instrument Serif"', '"Times New Roman"', 'Times', 'serif'],
      },
      keyframes: {
        'in-scale': {
          '0%': { opacity: '0', transform: 'scale(0.84)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'in-soft': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'in-pop': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '70%': { opacity: '1', transform: 'scale(1.03)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'in-stat': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'in-scale': 'in-scale 1.05s cubic-bezier(0.16,1,0.3,1) both',
        'in-soft': 'in-soft 1.05s cubic-bezier(0.16,1,0.3,1) both',
        'in-pop': 'in-pop 1.05s cubic-bezier(0.16,1,0.3,1) both',
        'in-stat': 'in-stat 1.05s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
