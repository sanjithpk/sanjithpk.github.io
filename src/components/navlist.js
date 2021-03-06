import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const List = ({
  name,
  className = "",
  liClassName = "",
  current,
  withThemeSwitch = true,
  currentTheme,
  switchTheme,
  themes
}) => {
  const data = useStaticQuery(graphql`
    query NavigationListQuery {
      site {
        siteMetadata {
          navLinks {
            name
            url
          }
          darkmode
          switchTheme
        }
      }
    }
  `)
  const items = data.site.siteMetadata.navLinks
  const list = items.map((e, i) => (
    <ListItem
      key={`navigation-${name}-${i}`}
      data={e}
      active={`/${current}` === e.url}
      liClassName={liClassName}
    />
  ))

  if (withThemeSwitch) {
    const themeButtons = themes.map((item, i) => {
      const next = i !== themes.length - 1 ? i + 1 : 0
      return (
        <button
          className={`text-default transition-transform duration-200 transform top-0 left-0 ${
            i === currentTheme ? "scale-100" : "scale-0 absolute"
          }`}
          title={`Switch to ${themes[next].label}`}
          key={`${name}-theme-switch-btn-${item.name}`}
          onClick={switchTheme}
        >
          {item.icon}
        </button>
      )
    })
    list.push(
      <li className="theme-switcher" key={`${name}-theme-switcher relative`}>
        {themeButtons}
      </li>
    )
  }

  return <ul className={className}>{list}</ul>
}

const ListItem = ({ data, active, liClassName }) => {
  return (
    <li className={`${liClassName} ${active ? "active" : ""}`}>
      <Link
        to={data.url}
        title={data.name}
        className="text-2xl lg:text-base uppercase text-default focus:text-primary"
      >
        <span>{data.name}</span>
      </Link>
    </li>
  )
}

export default List
