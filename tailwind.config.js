/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        desktop: "url('assets/images/background.png')",
        register: "url('assets/images/register.jpg')",
      },
      colors: {
        'medium-turquoise': '#00D4CB',
        'mint': '#73C69C',
        'mint-cream': '#EFFBF4'
      },
    },
  },
  plugins: [],
}
