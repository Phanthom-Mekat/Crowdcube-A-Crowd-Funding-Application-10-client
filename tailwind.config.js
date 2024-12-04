/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF7A00',
        secondary: '#FFC700',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}