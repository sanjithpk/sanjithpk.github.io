import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Social from "./icons/social"

export default function() {
  const query = useStaticQuery(graphql`
    query FooterLinksQuery {
      site {
        siteMetadata {
          name
          logo
          socialMedia {
            name
            url
          }
        }
      }
    }
  `)
  const siteData = query.site.siteMetadata
  return (
    <footer className="footer bg-bgalt py-12">
      <div className="container mx-auto text-center">
        <div className="flex justify-center my-3 mb-6">
          <Link to="/" title={siteData.title}>
            <img className="w-12" src={siteData.logo} alt="logo" />
          </Link>
        </div>
        <div className="flex justify-center">
          {siteData.socialMedia.map((e, i) => (
            <a className="p-2" href={e.url} title={e.name} key={i}>
              <Social name={e.name} />
            </a>
          ))}
        </div>
        <p className="text-color-default text-lg">
          Copyright &copy; {siteData.name} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
