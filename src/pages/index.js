import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Hero from "../components/hero"
import About from "../components/about"
import Projects from "../components/projects"

import ItemBlog from "../components/item-blog"

export default ({ data, location }) => {
  const blogList = data.blog.edges.map(item => (
    <ItemBlog data={item.node} key={`b-item-index-${item.node.id}`} />
  ))

  return (
    <Layout
      seo={{
        title: "Home"
      }}
      location={location}
    >
      <Hero />
      <About />
      <Projects />
      <Blog>{blogList}</Blog>
    </Layout>
  )
}

const Blog = ({ children }) => {
  return (
    <section className="container mx-auto px-0">
      <div className="pt-10 pb-10 text-center">
        <h2 className="text-color-1 font-black text-5xl lg:text-6xl">Blog</h2>
      </div>
      <div className="flex flex-wrap">{children}</div>
    </section>
  )
}

export const query = graphql`
  query IndexPageQuery {
    blog: allMdx(filter: { fields: { sourceName: { eq: "blog" } } }, limit: 6) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            date(formatString: "DD MMMM YYYY")
            banner {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
