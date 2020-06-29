import React from "react"

import avatar from "../images/avatar.jpg"
import resume from "../images/resume.pdf"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="Home" />
    <div className="container mx-auto px-4 md:px-8 my-16 md:my-24">
      <div className="flex flex-col md:flex-row mx-4">
        <div className="w-full flex justify-center my-4">
          <img className="rounded" src={avatar} alt="avatar" />
        </div>
        <div className="w-full flex-col justify-center my-4 my-auto">
          <p className="text-xl">Hi, my name is</p>
          <h1 className="text-5xl md:text-6xl text-color-default">
            Sanjith PK
          </h1>
          <h5 className="text-lg md:text-xl mb-0 text-color-3">
            Web Developer with a passion for Technology and Innovation
          </h5>
          <h5 className="text-lg md:text-xl mt-0 text-color-3">
            Always up for a Challenge
          </h5>
          <button className="btn btn-primary">
            <a href={resume} download="Resume.pdf">
              Resume
            </a>
          </button>
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
