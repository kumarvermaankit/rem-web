/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ping': '#2F88FF',
        'ping-dark': '#1A6FE0',
        'ping-light': '#49A1FF',
        'ping-lighter': '#EBF4FF',
      },
    },
  },
  plugins: [],
}
