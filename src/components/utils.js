import React from "react"

import { Link as GatsbyLink } from "gatsby"

const Link = props => {
  if (props.to) {
    if (props.to.startsWith("/")) {
      return <GatsbyLink {...props}>{props.children}</GatsbyLink>
    }

    return <a href={props.to}>{props.children}</a>
  } else {
    return <button {...props}></button>
  }
}

export { Link }
