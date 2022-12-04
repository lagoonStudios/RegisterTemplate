/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        desktop: "url('assets/images/background.png')",
      },
      colors: {
        'medium-turquoise': '#00D4CB',
      },
    },
  },
  plugins: [],
}
