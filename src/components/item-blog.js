import React, { useState } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import CalendarIcon from "./icons/calendar"

export const ItemBlog = ({ data }) => {
  const [focused, changeFocused] = useState(false)

  return (
    <div className="blog-item w-full p-4">
      <div
        className={`transition-all duration-300 hover:shadow-2xl shadow ${focused &&
          "focused"}`}
      >
        <Link
          to={data.fields.slug}
          title={data.frontmatter.title}
          onFocus={() => changeFocused(true)}
          onBlur={() => changeFocused(false)}
        >
          <div className="lg:ml-4 image lg:flex lg:py-6">
            <Img
              fluid={data.frontmatter.banner.childImageSharp.fluid}
              alt={data.frontmatter.title}
              className="w-full lg:w-1/2"
            />
            <div className="p-4 py-3">
              <h1 className="text-color-2 font-black text-3xl pt-1">
                {data.frontmatter.title}
              </h1>
              <div className="flex items-center text-secondary">
                <CalendarIcon className="stroke-current" />
                <p className="pl-2 text-color-default font-sans">
                  {data.frontmatter.date}
                </p>
              </div>
              <p className="pt-3 text-color-default">
                {data.frontmatter.description}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ItemBlog
