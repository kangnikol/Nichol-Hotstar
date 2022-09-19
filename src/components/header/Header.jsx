import React, { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
// import "./Header.scss"
import logo from "../../assets/logo1.png"
import kids from "../../assets/kids.png"

const headerNav = [
  {
    display: "Series",
    path: "/tv",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  // {
  //   display: "Nichol+",
  //   path: "/nicholplus",
  // },
  {
    display: (
      <>
        <div className="kids w-20">
          <img src={kids} alt="kids" />
        </div>
      </>
    ),
    path: "/kids",
  },
]

const Header = () => {
  const headerRef = useRef(null)

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
    <div ref={headerRef} className="header flex justify-between">
      <div className="header-wrap flex items-center px-12">
        <div className="logo w-40">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="header-nav text-white flex items-center">
          {headerNav.map((e, i) => (
            <li key={i} className="mx-4 text-lg mt-3">
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Header
