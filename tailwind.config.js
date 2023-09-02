/** @type {import('tailwindcss').Config} */

const buttonClasses = require('./tailwind/plugins/button');
const cardClasses = require('./tailwind/plugins/card');
const inputClasses = require('./tailwind/plugins/input');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    buttonClasses,
    cardClasses,
    inputClasses
  ],
};
