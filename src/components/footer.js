import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

export default function() {
  const query = useStaticQuery(graphql`
    query FooterLinksQuery {
      site {
        siteMetadata {
          name
          logo
        }
      }
    }
  `)
  return (
    <footer className="footer bg-bgalt py-12">
      <div className="container mx-auto text-center">
        <div className="flex justify-center my-3 mb-6">
          <Link to="/" title={query.site.siteMetadata.title}>
            <img
              className="w-12"
              src={query.site.siteMetadata.logo}
              alt="logo"
            />
          </Link>
        </div>
        <p className="text-color-default text-lg">
          Copyright &copy; {query.site.siteMetadata.name}{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
