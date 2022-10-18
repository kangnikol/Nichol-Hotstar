import React from "react"

const VideoCard = (props) => {
  const item = props.item
  return (
    <div className="flex flex-col justify-center px-1 items-center">
      <iframe
        className="rounded-lg"
        src={`https://www.youtube.com/embed/${item.key}`}
        title="video"
      ></iframe>
      <div className="mt-4">
        <h2>{item.name}</h2>
      </div>
    </div>
  )
}

export default VideoCard
