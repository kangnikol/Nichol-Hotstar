import React, { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Header.scss"
import logo from "../../assets/logo1.png"

const headerNav = [
  {
    display: "Series",
    path: "/tv",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "Nichol+",
    path: "/nicholplus",
  },
]

const Header = () => {
  const { pathname } = useLocation()
  const headerRef = useRef(null)

  const active = headerNav.findIndex((e) => e.path === pathname)

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink")
      }
      headerRef.current.classList.remove("shrink")
    }
    window.addEventListener("scroll", shrinkHeader)
    return () => {
      window.removeEventListener("scroll", shrinkHeader)
    }
  }, [])

  return (
    <div ref={headerRef} className="header">
      <div className="header-wrap">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="header-nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Header
