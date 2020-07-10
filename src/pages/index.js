import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

import resume from "../assets/resume.pdf"

export default ({ data, location }) => {
  const siteData = data.site.siteMetadata

  return (
    <Layout
      seo={{
        title: "Home"
      }}
      location={location}
    >
      <section className="container px-6 lg:px-24 min-h-screen flex flex-col justify-center items-start mx-auto">
        <h1 className="font-mono text-lg lg:text-xl">Hi, my name is</h1>
        <h2 className="text-5xl lg:text-6xl text-primary m-0">
          {siteData.name}
        </h2>
        <h3 className="text-4xl lg:text-5xl mt-0">{siteData.description}</h3>
        <div className="lg:w-2/3 mt-6">
          <p>{siteData.subDescription}</p>
        </div>
        <div className="w-full mt-12 lg:mb-12">
          <button className="btn btn-primary">
            <a href={resume} download="Resume.pdf">
              Resume
            </a>
          </button>
        </div>
      </section>
    </Layout>
  )
}

export const querry = graphql`
  query AboutQuery {
    site: site {
      siteMetadata {
        name
        description
        subDescription
      }
    }
  }
`
