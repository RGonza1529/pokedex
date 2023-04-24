/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
    },
    fontWeight: {
      light: 300,
      rg: 400,
      md: 500,
      bold: 800
    },
    minWidth: {
      50: '3.125rem'
    },
    extend: {
      screens: {
        md: '950px',
        lg: '1300px'
      },
      borderRadius: {
        30: '1.875rem',
        search: '0 1.875rem 1.875rem 0',
        name: '0 0 1.875rem 1.875rem'
      },
      height: {
        90: "22.5rem"
      },
    },
  },
  plugins: [],
}

