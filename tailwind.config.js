/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'arvo': ['Arvo', 'serif'],
        'danfo': ['Danfo', 'serif'],
      },
      backgroundColor: {
        'jet': '#2A2B2A',
      },
      zIndex: {
        'menu': ['1'],
      }
    },
  },
  plugins: [],
}

