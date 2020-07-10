import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { Form } from "../components/contact"

export default ({ data, location }) => {
  const api_url = data.site.siteMetadata.contact.api_url
  const hasContactForm = api_url
  return (
    <Layout
      seo={{
        title: "Contact"
      }}
      location={location}
    >
      <div className="container mx-auto py-12">
        <div className="title py-12 text-center">
          <h2 className="font-black text-5xl text-color-1">Contact</h2>
        </div>
        <div className="flex flex-wrap justify-center pb-40">
          {hasContactForm && (
            <div className="w-full lg:w-2/3 px-6">
              <Form api={api_url} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        contact {
          api_url
        }
      }
    }
  }
`
