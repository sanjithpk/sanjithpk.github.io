import React, { useState, useEffect } from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import "../style/index.css"

import SunIcon from "./icons/sun"
import MoonIcon from "./icons/moon"

import Navbar from "./navbar"
import Footer from "./footer"

import SEO from "../components/seo"

export default ({ children, seo, front, navPlaceholder = true, location }) => {
  const query = useStaticQuery(graphql`
    query ThemeQuery {
      site {
        siteMetadata {
          logo
          switchTheme
          darkmode
        }
      }
    }
  `)

  const themes = [
    {
      name: "theme-light",
      label: "Light Theme",
      icon: <SunIcon />
    },
    {
      name: "theme-dark",
      label: "Dark Theme",
      icon: <MoonIcon />
    }
  ]

  const isDarkTheme = query.site.siteMetadata.darkmode

  const [theme, changeTheme] = useState(isDarkTheme ? 1 : 0)

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      const t = Number(localStorage.getItem("theme"))
      changeTheme(t)
    }
  }, [])

  const switchTheme = () => {
    const next = theme !== themes.length - 1 ? theme + 1 : 0
    changeTheme(next)
    localStorage.setItem("theme", `${next}`)
  }

  return (
    <React.Fragment>
      <Head data={query} />
      <SEO {...seo} />
      <div className={`wrapper ${themes[theme].name}`}>
        <div className="text-color-default bg-bg">
          <Navbar
            front={front}
            navPlaceholder={navPlaceholder}
            location={location}
            currentTheme={theme}
            switchTheme={switchTheme}
            themes={themes}
            allowThemeSwitch={query.site.siteMetadata.switchTheme}
          />
          {children}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  )
}

const Head = ({ data }) => {
  return (
    <Helmet>
      <link rel="icon" href={data.site.siteMetadata.icon} type="image/png" />
    </Helmet>
  )
}
