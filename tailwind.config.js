/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: '#FF6B6B',
          secondary: '#FFD93D',
        },
        backgroundImage: {
          'gradient-main': 'linear-gradient(to bottom right, #FF6B6B, #FFD93D)',
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };
  