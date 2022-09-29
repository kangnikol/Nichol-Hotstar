import React, { useEffect, useRef } from "react"

const VideoCard = (props) => {
  const item = props.item
  // const iframeRef = useRef(null)
  // useEffect(() => {
  // const height = (iframeRef.current.offsetWitdh * 9) / 16 + "px"
  // iframeRef.current.setAttribute("height", height)
  // const width = (iframeRef.current.offsetWitdh * 9) / 16 + "px"
  // iframeRef.current.setAttribute("width", width)
  // }, [])
  return (
    <div>
      <iframe
        className="rounded-lg"
        src={`https://www.youtube.com/embed/${item.key}`}
        // ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
      <div className="video-title mt-4 text-center">
        <h2>{item.name}</h2>
      </div>
    </div>
  )
}

export default VideoCard
