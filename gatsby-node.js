const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode })
    const sourceName = getNode(node.parent).sourceInstanceName
    const prefix = sourceName === "basepages" ? "" : "/" + sourceName

    createNodeField({
      node,
      name: `slug`,
      value: `${prefix}${slug}`
    })
    createNodeField({
      node,
      name: `sourceName`,
      value: sourceName
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    query GatsbyNodeQuery {
      all: allMdx {
        edges {
          node {
            fields {
              slug
              sourceName
            }
          }
        }
      }
      blog: allMdx(filter: { fields: { sourceName: { eq: "blog" } } }) {
        edges {
          node {
            id
          }
        }
      }
      limitPost: site {
        siteMetadata {
          blogItemsPerPage
        }
      }
    }
  `).then(result => {
    result.data.all.edges.forEach(({ node }) => {
      let template = node.fields.sourceName
      createPage({
        path: node.fields.slug,
        component: path.resolve("./src/templates/" + template + ".js"),
        context: {
          slug: node.fields.slug
        }
      })
    })

    const blogPosts = result.data.blog.edges
    const blogPostsPerPage = result.data.limitPost.siteMetadata.blogItemsPerPage
    const numBlogPages = Math.ceil(blogPosts.length / blogPostsPerPage)

    Array.from({ length: numBlogPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: path.resolve("./src/templates/blog-list.js"),
        context: {
          limit: blogPostsPerPage,
          skip: i * blogPostsPerPage,
          numPages: numBlogPages,
          currentPage: i + 1
        }
      })
    })
  })
}
