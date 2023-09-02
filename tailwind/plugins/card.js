const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addUtilities }) {
  const cardClasses = {
    '.card': {
      borderWidth: '2px',
      borderColor: '#000',
      borderRadius: '0.75rem',
      boxShadow: '0 0 #0000, 0 0 #0000, 5px 5px #000',
      width: '80vw',
      padding: '0 !important',
    },
  }
  addUtilities(cardClasses)
})
