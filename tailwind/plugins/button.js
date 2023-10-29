const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addUtilities }) {
  const buttonClasses = {
    '.btn-primary-md': {
      '&::part(native)': {
        borderWidth: '2px',
        borderColor: '#000',
        border: 'solid',
        boxShadow: '0 0 #0000, 0 0 #0000, 5px 5px #000',
        background: 'var(--ion-color-secondary)',
        borderRadius: '0',
        color: '#000',
        height: '44px',
        width: '150px',
        fontWeight: 'bold',
        fontSize: '16px',
        textTransform: 'uppercase',
      }
    },
    '.btn-secondary-md': {
      '&::part(native)': {
        borderWidth: '2px',
        borderColor: '#000',
        border: 'solid',
        boxShadow: '0 0 #0000, 0 0 #0000, 5px 5px #000',
        background: 'var(--ion-background-secondary)',
        borderRadius: '0',
        color: '#000',
        height: '44px',
        width: '150px',
        fontWeight: 'bold',
        fontSize: '16px',
        textTransform: 'uppercase',
      }
    },
    '.btn-primary-lg': {
      '&::part(native)': {
        borderWidth: '2px',
        borderColor: '#000',
        border: 'solid',
        boxShadow: '0 0 #0000, 0 0 #0000, 5px 5px #000',
        background: 'var(--ion-color-secondary)',
        borderRadius: '0',
        color: '#000',
        height: '44px',
        width: '230px',
        fontWeight: 'bold',
        fontSize: '16px',
        textTransform: 'uppercase',
      }
    },
    '.btn-secondary-lg': {
      '&::part(native)': {
        borderWidth: '2px',
        border: 'solid',
        boxShadow: '0 0 #0000, 0 0 #0000, 5px 5px #000',
        background: 'var(--ion-background-secondary)',
        borderRadius: '0',
        color: 'var(--ion-color-primary)',
        height: '44px',
        width: '230px',
        fontWeight: 'bold',
        fontSize: '16px',
        textTransform: 'uppercase',
      }
    },
    '.btn-link': {
      color: 'var(--ion-color-secondary)',
      cursor: 'pointer',
      textDecoration: 'underline',
    }
  }
  addUtilities(buttonClasses)
})
