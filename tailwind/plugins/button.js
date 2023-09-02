const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addUtilities }) {
  const buttonClasses = {
    '.btn-md': {
      '&::part(native)': {
        borderWidth: '2px',
        borderColor: '#000',
        border: 'solid',
        boxShadow: '0 0 #0000, 0 0 #0000, 5px 5px #000',
        background: '#a08dfb',
        borderRadius: '0',
        color: '#000',
        height: '44px',
        width: '150px',
        fontWidth: 'bold',
        fontSize: '16px',
        '&:hover': {
          background: '#82b5bf',
          color: '#fff',
          borderColor: '#000',
        },
      }
    },
    '.btn-xl': {
      '&::part(native)': {
        borderWidth: '2px',
        borderColor: '#000',
        border: 'solid',
        boxShadow: '0 0 #0000, 0 0 #0000, 5px 5px #000',
        background: '#a08dfb',
        borderRadius: '0',
        color: '#000',
        height: '44px',
        width: '200px',
        fontWidth: 'bold',
        fontSize: '16px',
        '&:hover': {
          background: '#82b5bf',
          color: '#fff',
          borderColor: '#000',
        },
      }
    }
  }
  addUtilities(buttonClasses)
})
