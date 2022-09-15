import React from "react"
import "./Footer.scss"
import { Link } from "react-router-dom"
import logo from "../../assets/logo1.png"

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content container">
        <div className="footer-content-logo">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>
        <div className="footer-content-menus">
          <div className="footer-content-menu">
            <Link to="/">Home</Link>
            <Link to="/">Contact Us</Link>
            <Link to="/">Terms of Services</Link>
            <Link to="/">About Us</Link>
          </div>
          <div className="footer-content-menu">
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Premium</Link>
            <Link to="/">Privacy Policy</Link>
          </div>
          <div className="footer-content-menu">
            <Link to="/">You Must watch</Link>
            <Link to="/">Recent Releases</Link>
            <Link to="/">Top IMDB</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
