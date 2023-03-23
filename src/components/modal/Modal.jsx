import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import "./Modal.scss"

const Modal = (props) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(props.active)
  }, [props.active])

  return (
    <div
      id={props.id}
      className={`modal flex items-center justify-center fixed z-[100] top-0 left-0 right-0 bottom-0 overflow-auto bg-black/40 opacity-0 invisible ${
        active ? "opacity-1 visible" : ""
      }`}
    >
      {props.children}
    </div>
  )
}

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
}

export const ModalContent = (props) => {
  const contentRef = useRef(null)
  const closeModal = () => {
    contentRef.current.parentNode.classList.remove("active")
    if (props.onClose) props.onClose()
  }
  return (
    <div
      ref={contentRef}
      className="modal-content p-8 bg-gray-900 w-1/2 transform -translate-y-64 [transition:_transform_0.6s_ease,_opacity_0.6s_ease] relative"
    >
      {props.children}
      <div className="modal-content-close" onClick={closeModal}>
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  )
}

ModalContent.propTypes = {
  onClose: PropTypes.func,
}

export default Modal
