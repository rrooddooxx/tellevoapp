const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addUtilities }) {
  const cardClasses = {
    ".card": {
      borderWidth: "2px",
      borderColor: "#000",
      borderRadius: "0.75rem",
      boxShadow: "0 0 #0000, 0 0 #0000, 5px 5px #000",
      width: "80vw",
      padding: "0 !important",
    },
    ".card-trip-search-home": {
      borderWidth: "2px",
      borderColor: "#000",
      borderRadius: "0.75rem",
      boxShadow: "0 0 #0000, 0 0 #0000, 5px 5px #000",
      width: "86vw",
      padding: "2 !important",
    },
    ".card-secondary": {
      borderWidth: "2px",
      borderColor: "var(--ion-color-secondary-shade)",
      borderRadius: "0.75rem",
      boxShadow:
        "0 0 #0000, 0 0 #0000, 5px 5px var(--ion-color-secondary-shade)",
      width: "90vw",
      padding: "0 !important",
    },
    ".card-tertiary": {
      borderWidth: "2px",
      borderColor: "#000",
      borderRadius: "0",
      boxShadow: "0 0 #0000, 0 0 #0000, 5px 5px #000",
      width: "90vw",
      padding: "0 !important",
    },
    ".card-map-input": {
      backgroundColor: "white",
      borderWidth: "2px",
      borderColor: "#000",
      borderRadius: "8",
      overflow: "hidden",
      boxShadow: "0 0 #0000, 0 0 #0000, 5px 5px #000",
      width: "90%",
      padding: "0 !important",
      marginTop: 12,
      marginLeft: 16,
    },
    ".pac-card": {
      backgroundColor: "white",
      border: "0",
      borderRadius: "2px",
      boxShadow: "0 1px 4px -1px rgba(0, 0, 0, 0.3)",
      margin: "10px",
      padding: "0 0.5em",
      fontWight: "400",
      fontSize: "18px",
      overflow: "hidden",
      padding: "0"
    }
  };
  addUtilities(cardClasses);
});
