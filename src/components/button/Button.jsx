import React from "react"
import propTypes from "prop-types"

const Button = ({ className, onClick, children }) => (
  <button
    className={`btn ${className}`}
    onClick={onClick ? () => onClick() : null}
  >
    {children}
  </button>
)

export const OutlineButton = (props) => (
  <Button
    className="text-white py-1 px-2 border-2 border-white rounded-full"
    onClick={props.onClick && props.onClick()}
  >
    {props.children}
  </Button>
)

Button.propTypes = {
  onClick: propTypes.func,
}

export default Button
