/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          dark: '#1A237E',
          primary: '#3949AB',
          light: '#5C6BC0',
        },
      },
    },
  },
  plugins: [],
}

