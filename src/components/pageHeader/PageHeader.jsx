import React from "react"
import "./PageHeader.scss"

const pageHeader = (props) => {
  return (
    <div className="page-header">
      <h2>{props.children}</h2>
    </div>
  )
}

export default pageHeader
