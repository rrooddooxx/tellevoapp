const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addUtilities }) {
  const inputClasses = {
    '.input': {
        padding: '0 0.5rem !important',
        fontWidth: 'bold',
        '&:focus': {
          background: '#82b5bf',
        }
    },
  }
  addUtilities(inputClasses)
})
