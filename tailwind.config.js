/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0D9488",
        "secondary": "#14B8A6",
        "dark": "#0F172A",
        "background-light": "#F8FAFC",
        "background-dark": "#0F172A",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "serif": ["Playfair Display", "serif"]
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
