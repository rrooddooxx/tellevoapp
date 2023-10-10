const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addUtilities }) {
  const inputClasses = {
    '.input-primary': {
      padding: '0 0.5rem !important',
      fontWeight: '600 !important',
    }
  }
  addUtilities(inputClasses)
})
