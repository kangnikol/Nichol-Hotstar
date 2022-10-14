import React from "react"
// import "./PageHeader.scss"

const pageHeader = (props) => {
  return (
    <div className="page-header text-white text-3xl">
      <h2>{props.children}</h2>
    </div>
  )
}

export default pageHeader
