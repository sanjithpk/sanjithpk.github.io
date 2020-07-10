import React from "react"

import Layout from "../components/layout"

const NotFoundPage = ({ location }) => {
  return (
    <Layout
      seo={{
        title: "404"
      }}
      location={location}
    >
      <div>
        <h1>404 Not Found</h1>
      </div>
    </Layout>
  )
}

export default NotFoundPage
