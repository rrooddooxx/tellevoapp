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
  };
  addUtilities(inputClasses);
});
