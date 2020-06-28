const siteMetadata = require("./config")
const tailwindConfig = require("./tailwind.config")
const autoprefixer = require("autoprefixer")
const tailwindcss = require("tailwindcss")

const plugins = [
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`
    }
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `SanjithPK`,
      short_name: `Sanjith`,
      start_url: `/`,
      background_color: `#663399`,
      theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/images/logo.png`
    }
  },
  `gatsby-plugin-offline`,
  {
    resolve: `gatsby-plugin-postcss`,
    options: {
      postCssPlugins: [
        tailwindcss(tailwindConfig),
        autoprefixer,
        ...(process.env.NODE_ENV === `production` ? [require(`cssnano`)] : [])
      ]
    }
  }
]

module.exports = {
  siteMetadata: siteMetadata,
  plugins: plugins
}
