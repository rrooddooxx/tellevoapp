/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents }) {
      addUtilities({
        '.shadow': {
          'box-shadow': '0 0 #0000, 0 0 #0000, 5px 5px #000'
        },
      });
      addComponents({
        '.card': {
          borderWidth: '2px',
          borderColor: '#000',
          borderRadius: '0.75rem',
          boxShadow: '0 0 #0000, 0 0 #0000, 5px 5px #000',
          width: '80%',
          padding: '0 !important',
        },

        '.input': {
          padding: '0 0.5rem !important',
          fontWidth: 'bold'
        },

        '.btn': {
          borderWidth: '2px',
          borderColor: '#000',
          border: 'solid',
          boxShadow: '0 0 #0000, 0 0 #0000, 5px 5px #000',
          background: '#a08dfb',
          color: '#000',
          height: '44px',
          width: '140px',
          fontWidth: 'bold',
          fontSize: '16px',
          '&:hover': {
            background: '#82b5bf',
            color: '#fff',
            borderColor: '#000',
          },
        },
      })
    }),
  ],
};
