/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        custom: 'Camerao',
        custom: 'DxLactos',
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        pinkish: '#E785F2',
      },
    },
  },
  plugins: [],
};

