import React from "react"
import propTypes from "prop-types"

// import "./Button.scss"

const Button = (props) => {
  return (
    <button
      className={`btn ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  )
}

export const OutlineButton = (props) => {
  return (
    <Button
      className="text-white p-3 border-2 border-white rounded-full"
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </Button>
  )
}

Button.propTypes = {
  onClick: propTypes.func,
}

export default Button
