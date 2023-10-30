/** @type {import('tailwindcss').Config} */

const buttonClasses = require('./tailwind/plugins/button');
const cardClasses = require('./tailwind/plugins/card');
const inputClasses = require('./tailwind/plugins/input');
const utilsClasses = require('./tailwind/plugins/utils');

module.exports = {
  content: ['./src/**/*.{html,ts,js}'],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        fadeIn: {
          '0%': { transform: 'scale(0) translateY(60%)' },
          '20%': { transform: 'scale(0) translateY(60%)' },
          '50%': { transform: 'scale(1.8) translateY(60%)' },
          '100%': { transform: 'scale(1) translateY(0)' }
        },
        enterText: {
          '0%': { width: '0', visibility: 'hidden' },
          '80%': { width: '0', visibility: 'hidden' },
          '100%': { width: '100%' }
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        display: {
          '0%': { width: '0' },
          '100%': { width: '0' }
        }
      },
      animation: {
        'slide-in': 'slideIn 0.2s linear forwards',
        'fade-in': 'fadeIn 1.5s ease-in forwards',
        'enter-text': 'enterText 2s ease-in forwards',
        'typing': 'display 2s, typing 1s 2s steps(40, end)',
      }
    },
  },
  plugins: [
    buttonClasses,
    cardClasses,
    inputClasses,
    utilsClasses
  ],
};
