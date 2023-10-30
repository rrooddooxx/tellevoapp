const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addUtilities }) {
  const utilsClasses = {
    '.text-wrap-balance': {
      textWrap: 'balance'
    },
  }
  addUtilities(utilsClasses)
})
