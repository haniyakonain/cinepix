/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cinepix: {
          50:  '#fff1f1',  // Lightest shade
          100: '#ffe4e4',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',  // Primary brand color
          600: '#dc2626',
          700: '#b91c1c',  // Dark shade for backgrounds
          800: '#991b1b',
          900: '#7f1d1d',  // Darkest shade
        },
        darkBg: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',  // Main background color
          800: '#1e293b',
          900: '#0f172a',
        },
        navy: {
          700: '#1a365d',
          800: '#1a1a2e',
          900: '#0f0f1a',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(239, 68, 68, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}