const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")
const _ = require("lodash")

const gradient = plugin(function({ addUtilities, e, theme, variants }) {
  const gradients = theme("gradients", {})
  const gradientVariants = variants("gradients", [])

  const utilities = _.map(gradients, ([start, end], name) => ({
    [`.bg-gradient-${e(name)}`]: {
      backgroundImage: `linear-gradient(to right, ${start}, ${end})`
    }
  }))

  addUtilities(utilities, gradientVariants)
})

module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    gradients: theme => ({
      primary: [theme("colors.primary"), theme("colors.secondary")]
    }),
    themes: {},
    colors: {
      bg: "var(--bg)",
      bgalt: "var(--bgalt)",
      "color-default": "var(--color-default)",
      "color-1": "var(--color-1)",
      "color-2": "var(--color-2)",
      "color-3": "#aeb4c5",
      primary: "var(--color-primary)",
      secondary: "#6888df",
      link: "#0a71c5",
      medium: "var(--medium)",
      transparent: "rgba(0,0,0,0)",
      error: "#ef5350",
      success: "#8bc34a"
    },
    extend: {
      fontSize: {
        "7xl": "5rem"
      },
      spacing: {
        "1px": "1px",
        "2px": "2px"
      }
    }
  },
  variants: {},
  plugins: [require(`tailwind-theme-switcher`), gradient]
}
