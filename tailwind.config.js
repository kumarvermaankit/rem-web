/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'whatsapp': '#25D366',
        'whatsapp-dark': '#128C7E',
        'whatsapp-light': '#DCF8C6',
      },
    },
  },
  plugins: [],
}
