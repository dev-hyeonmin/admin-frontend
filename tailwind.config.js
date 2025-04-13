/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media', // or 'class' or false
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0064FF',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
