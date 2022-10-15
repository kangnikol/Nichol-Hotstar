import React from "react"
// import "./PageHeader.scss"

const pageHeader = (props) => {
  return (
    <div className="page-header text-white text-3xl px-20 py-8 text-center mb-8 relative bg-top bg-cover bg-no-repeat">
      <h2 className="relative z-auto">{props.children}</h2>
    </div>
  )
}

export default pageHeader
