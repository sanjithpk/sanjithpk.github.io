import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import resume from "../assets/resume.pdf"

export default () => {
  const querry = useStaticQuery(graphql`
    query HeroQuery {
      site: site {
        siteMetadata {
          name
          description
          subDescription
        }
      }
    }
  `)

  const siteData = querry.site.siteMetadata

  return (
    <React.Fragment>
      <div
        className="hidden xl:block absolute rounded-full bg-gradient-1"
        style={{ height: 180, width: 180, top: 210, left: -90 }}
      />
      <div
        className="hidden xl:block absolute rounded-full bg-gradient-2"
        style={{ height: 35, width: 35, top: 150, left: 25 }}
      />
      <div
        className="hidden xl:block absolute rounded-full bg-gradient-3"
        style={{ height: 190, width: 190, bottom: 80, right: 120 }}
      />
      <div
        className="hidden xl:block absolute rounded-full bg-gradient-4"
        style={{ height: 90, width: 90, bottom: 80, left: 20 }}
      />
      <div
        className="hidden xl:block absolute rounded-full bg-donut-1"
        style={{ height: 170, width: 170, top: 120, right: 40 }}
      />
      <section className="container px-6 lg:px-24 py-20 lg:py-12 flex flex-col justify-start items-start mx-auto">
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
    </React.Fragment>
  )
}
