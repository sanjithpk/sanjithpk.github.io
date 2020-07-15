const siteMetadata = require("./config")
const tailwindConfig = require("./tailwind.config")
const autoprefixer = require("autoprefixer")
const tailwindcss = require("tailwindcss")

const plugins = [
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `assets`,
      path: `${__dirname}/src/assets`
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `blog`,
      path: `${__dirname}/content/blog/`
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `projects`,
      path: `${__dirname}/content/projects/`
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `basepages`,
      path: `${__dirname}/content/basepages`
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
      icon: `src/assets/logo.png`
    }
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1200
          }
        }
      ],
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            backgroundColor: "transparent"
          }
        }
      ]
    }
  },
  `gatsby-plugin-offline`,
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1200
          }
        }
      ]
    }
  },
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
