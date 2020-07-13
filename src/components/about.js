import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import avatar from "../assets/avatar.jpg"

export default () => {
  const querry = useStaticQuery(graphql`
    query AboutQuery {
      site: site {
        siteMetadata {
          about {
            intro
            para1
            para2
            techLeft
            techRight
          }
        }
      }
    }
  `)

  const aboutData = querry.site.siteMetadata.about

  return (
    <React.Fragment>
      <div className="container mx-auto px-0">
        <div className="pt-10 pb-10 text-center">
          <h2 className="text-color-1 font-black text-5xl lg:text-6xl">
            About
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row-reverse px-4 xl:mx-12 items-center">
          <img className="rounded" src={avatar} alt="avatar" />
          <div className="p-6 xl:mx-24">
            <p className="">{aboutData.intro}</p>
            <p className="mt-2">{aboutData.para1}</p>
            <p className="mt-2">{aboutData.para2}</p>
            <p className="mt-2">
              Here are a few technologies I've been working with recently:
            </p>
            <div className="flex px-6 py-2">
              <ul>
                {aboutData.techLeft.map((e, i) => {
                  return (
                    <li className="list-disc" id={i}>
                      {e}
                    </li>
                  )
                })}
              </ul>
              <ul className="ml-12">
                {aboutData.techRight.map((e, i) => {
                  return (
                    <li className="list-disc" id={i}>
                      {e}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
