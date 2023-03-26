/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'navbarShadow': '0px 10px 30px 0px #00000040',
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant(`children`, `& > *`)
    },
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin'),
    // ...
  ],
}