/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color: {
        'primary': '#C1B6A3'
      },
      fontFamily: {
        sans: ['NotoSansCJKkr', 'sans-serif']
      }
    },
  },
  plugins: [],
}

