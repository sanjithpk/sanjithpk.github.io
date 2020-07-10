import React from "react"

import Layout from "../components/layout"
import Hero from "../components/hero"

export default ({ location }) => {
  return (
    <Layout
      seo={{
        title: "Home"
      }}
      location={location}
    >
      <Hero />
    </Layout>
  )
}
