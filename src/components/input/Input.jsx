import React from "react"
// import "./Input.scss"

const Input = (props) => {
  return (
    <div className="text-center">
      <input
        className="border-0 bg-black px-6 py-3 rounded-full text-white"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange ? (e) => props.onChange(e) : null}
      />
    </div>
  )
}

export default Input
