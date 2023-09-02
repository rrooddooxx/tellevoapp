const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addUtilities }) {
  const inputClasses = {
    '.input-primary': {
        padding: '0 0.5rem !important',
        fontWidth: 'bold',
        '&:focus': {
          background: '#a08dfb',
          color: '#141520'
        },
        '&:hover': {
          background: '#a08dfb',
          color: '#141520'
        }
    },
    '.input-secondary': {
      padding: '0 0.5rem !important',
      fontWidth: 'bold',
  },
  }
  addUtilities(inputClasses)
})
