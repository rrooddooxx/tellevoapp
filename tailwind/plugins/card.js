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
    '.card-secondary': {
      borderWidth: '2px',
      borderColor: 'var(--ion-color-secondary-shade)',
      borderRadius: '0.75rem',
      boxShadow: '0 0 #0000, 0 0 #0000, 5px 5px var(--ion-color-secondary-shade)',
      width: '90vw',
      padding: '0 !important',
    },
    '.card-tertiary': {
      borderRadius: '0.75rem',
      boxShadow: '0 0 5px 2.5px var(--ion-color-secondary-shade)',
      width: '100%'
    }
  }
  addUtilities(cardClasses)
})
