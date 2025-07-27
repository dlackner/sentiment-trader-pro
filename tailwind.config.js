/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/client/**/*.{js,jsx,ts,tsx}",
    "./src/client/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        'dark': {
          100: '#1a1a1a',
          200: '#2a2a2a',
          300: '#3a3a3a',
          400: '#4a4a4a',
        },
        // Light theme colors
        'light': {
          100: '#ffffff',
          200: '#f8fafc',
          300: '#f1f5f9',
          400: '#e2e8f0',
        },
        // Accent colors (work in both themes)
        'accent': {
          green: '#00ff88',
          red: '#ff3366',
          blue: '#00bbff',
          yellow: '#ffbb00',
        },
        // Theme-aware semantic colors
        'bg': {
          primary: '#ffffff', // light bg
          secondary: '#f8fafc', // light secondary
        },
        'text': {
          primary: '#1e293b', // light text
          secondary: '#64748b', // light secondary text
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}