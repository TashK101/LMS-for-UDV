/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      width: {
        "1/31": "3.22580645161290322580%",      },
        colors: {
          'color1': '#C9C9C7',
          'color2': '#79747E',
          'color3': '#898989',
          'color4': '#913D00',
          'color5': '#FFEDCF',
          'color6': '#F59D0E',
          'color7': '#2B2A29',
          'color8': '#FFCE80',
        },
        fontFamily: {
          'golos': ['Golos Text', 'sans-serif']
        }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};