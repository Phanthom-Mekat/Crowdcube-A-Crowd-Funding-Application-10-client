/* eslint-disable no-undef */
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
        primary: '#FF7A00',
        secondary: '#FFC700',
        dark: {
          primary: '#FF7A00',
          secondary: '#FFC700',
          neutral: '#0D0D0D',
          "base-100": '#F8F8F8',
          "base-200": '#E4E4E4',
          "base-300": '#D9D9D9',
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ], 

  daisyui: {
    darkTheme: "dark",
  },
};

