import React from "react"
// import "./Footer.scss"
import { Link } from "react-router-dom"
import logo from "../../assets/logo1.png"

const Footer = () => {
  return (
    <div className="footer relative py-24 px-8">
      <div className="footer-content container max-w-3xl mx-auto">
        <div className="footer-content-logo flex justify-center items-center mb-12">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>
        <div className="footer-content-menus grid grid-cols-3">
          <div className="footer-content-menu text-lg text-white flex flex-col justify-start items-start">
            <Link to="/">Home</Link>
            <Link to="/">Contact Us</Link>
            <Link to="/">Terms of Services</Link>
            <Link to="/">About Us</Link>
          </div>
          <div className="footer-content-menu text-lg text-white flex flex-col justify-start items-start">
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Premium</Link>
            <Link to="/">Privacy Policy</Link>
          </div>
          <div className="footer-content-menu text-lg text-white flex flex-col justify-start items-start">
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
