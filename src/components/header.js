import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteName }) => (
  <header>
    <div>
      <h1>{siteName}</h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
