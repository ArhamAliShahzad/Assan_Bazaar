/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'noon-green': '#98FF98',  // Hamara Mint Green
        'noon-dark': '#1a1a1a',   // Charcoal Grey
      },
      borderRadius: {
        'noon': '2rem',
      }
    },
  },
  plugins: [],
}