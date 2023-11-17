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
        login: "url('assets/images/loginBackground.png')",
      },
      colors: {
        'medium-turquoise': '#00D4CB',
        'mint': '#73C69C',
        'mint-cream': '#EFFBF4',
        'yellow': '#FFFF1D',
        'blue-gray': '#6699CC',
        'erin': '#68FF5B',
        'veronica': '#A408FF'
      },
      boxShadow: {
        'submitButton': '-8px 8px 3px 5px rgba(0,0,0,1)'
      }
    },
  },
  plugins: [],
}
