const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addUtilities }) {
  const inputClasses = {
    ".input-primary": {
      padding: "0 0.5rem !important",
      fontWeight: "600 !important",
    },
    ".input-trip-search-home": {
      padding: "0.5rem 0.5rem !important",
      fontWeight: "500 !important",
    },
    ".input-primary-map": {
      backgroundColor: "white !important",
      padding: "0 0.5rem !important",
      fontWeight: "600 !important",
      padding: 20,
      width: "100%",
      fontSize: 18,
    },
    ".input-primary-map:focus-visible": {
      backgroundColor: "white !important",
      padding: "0 0.5rem !important",
      fontWeight: "600 !important",
      padding: 20,
      width: "100%",
      fontSize: 18,
      borderWidth: "0 !important",
    },
  };
  addUtilities(inputClasses);
});
