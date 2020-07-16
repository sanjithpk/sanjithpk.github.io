import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Github, External } from "./icons/social"

export default () => {
  const query = useStaticQuery(graphql`
    query ProjectsQuery {
      allMdx(
        filter: { fields: { sourceName: { eq: "projects" } } }
        sort: { fields: frontmatter___id }
      ) {
        edges {
          node {
            body
            frontmatter {
              title
              github
              external
              id
              tech
              cover {
                childImageSharp {
                  fluid {
                    srcSet
                    ...GatsbyImageSharpFluid
                  }
                }
                id
              }
            }
          }
        }
      }
    }
  `)

  const projects = query.allMdx.edges.map(project => (
    <Project
      data={project.node}
      key={`project-index-${project.node.frontmatter.id}`}
    />
  ))

  return (
    <section className="relative">
      <div className="container mx-auto px-0">
        <div className="pt-10 pb-10 text-center">
          <h2 className="text-color-1 font-black text-5xl lg:text-6xl">
            Projects
          </h2>
        </div>
        <div className="flex flex-wrap">{projects}</div>
      </div>
    </section>
  )
}

const Project = ({ data }) => {
  const projectData = data.frontmatter
  const evenOdd = (left, right) => (projectData.id % 2 === 0 ? left : right)
  return (
    <div
      className={`lg:flex xl:mx-24 p-2 mt-12 ${evenOdd(
        "flex-row-reverse",
        ""
      )}`}
    >
      <div className="lg:w-1/2 px-2">
        <a title="External Link" href={projectData.external}>
          <Img
            className="rounded shadow-md lg:opacity-50 lg:hover:opacity-100"
            fluid={projectData.cover.childImageSharp.fluid}
          />
        </a>
      </div>
      <div
        className={`lg:w-1/2 px-2 my-auto flex flex-col ${evenOdd(
          "xl:items-start",
          "xl:items-end"
        )}`}
      >
        <h2 className="text-2xl text-color-default font-bold px-4">
          {projectData.title}
        </h2>
        <div
          className={`bg-bgalt px-4 py-2 relative shadow-md rounded-sm ${evenOdd(
            "lg:-mr-10",
            "lg:-ml-10"
          )}`}
        >
          <MDXProvider>
            <MDXRenderer>{data.body}</MDXRenderer>
          </MDXProvider>
        </div>
        <ul className="mt-2 relative px-4">
          {projectData.tech.map((e, i) => (
            <li className="inline-block px-2 font-mono" key={i}>
              {e}
            </li>
          ))}
        </ul>

        <div className="flex mt-2 px-4">
          <a className="p-2" title="Github" href={projectData.github}>
            <Github />
          </a>
          <a className="p-2" title="External" href={projectData.external}>
            <External />
          </a>
        </div>
      </div>
    </div>
  )
}
