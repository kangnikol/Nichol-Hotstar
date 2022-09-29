import React from "react"
// import "./Footer.scss"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="px-10 text-sm text-gray-300 py-14">
      <div className="flex lg:justify-between lg:items-center flex-wrap">
        <div>
          <div className="flex flex-row flex-wrap mb-1">
            <Link className="mr-4 mb-1" to="/">
              About Nichol+ Hotstar
            </Link>
            <Link className="mr-4" to="/">
              Terms Of Use
            </Link>
            <Link className="mr-4" to="/">
              Privacy Policy (New)
            </Link>
            <Link className="mr-4" to="/">
              FAQ
            </Link>
            <Link className="mr-4" to="/">
              Feedback
            </Link>
          </div>
          <span className="text-xs">
            © 2022 Nichol and its related entities. All Rights Reserved. © 2022
            Nichol’s licensor entities. All Rights Reserved.
          </span>
        </div>
        <div>
          <p className="mt-2 lg:mb-2">Connect with me</p>
          <div className="flex justify-around">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/kangnikol"
            >
              <i className="fa-brands fa-github text-4xl"></i>
            </a>
            <a target="_blank" rel="noreferrer" href="https://kangnikol.xyz">
              <i className="fa-solid fa-code text-4xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
