import React from "react"

import Layout from "../components/layout"
import About from "../components/about"

const AboutPage = ({ location }) => {
  return (
    <Layout
      seo={{
        title: "About"
      }}
      location={location}
    >
      <About />
    </Layout>
  )
}

export default AboutPage
