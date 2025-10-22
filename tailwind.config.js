/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Custom dark mode colors
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          border: '#334155'
        }
      }
    },
  },
  plugins: [],
}

