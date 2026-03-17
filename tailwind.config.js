export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        dark: {
          bg: '#0f172a',
          card: '#1e293b',
          border: '#334155',
        },
        danger: '#dc2626',
        warning: '#f59e0b',
        success: '#10b981',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
