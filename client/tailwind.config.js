/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saathi: {
          saffron: '#C2410C',
          navy: '#06038D',
          green: '#046A38',
          ashoka: '#000080',
          cream: '#FFF9F2',
          lightBg: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
