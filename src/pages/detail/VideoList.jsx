import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import tmdbApi from "../../api/tmdbApi"

const VideoList = (props) => {
  const { category } = useParams()
  const [videos, setVideos] = useState([])
  useEffect(() => {
    const getVideos = async () => {
      const res = await tmdbApi.getVideos(category, props.id)
      setVideos(res.results.slice(0, 5))
    }
    getVideos()
  }, [category, props.id])
  return (
    <>
      {videos.map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </>
  )
}

const Video = (props) => {
  const item = props.item
  const iframeRef = useRef(null)
  useEffect(() => {
    const height = (iframeRef.current.offsetWitdh * 9) / 16 + "px"
    iframeRef.current.setAttribute("height", height)
    const width = (iframeRef.current.offsetWitdh * 9) / 16 + "px"
    iframeRef.current.setAttribute("width", width)
  }, [])
  return (
    <div className="video mr-2">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        <SwiperSlide>
          <iframe
            className="rounded-lg"
            src={`https://www.youtube.com/embed/${item.key}`}
            ref={iframeRef}
            width="100%"
            title="video"
          ></iframe>
          <div className="video-title mt-4 text-center">
            <h2>{item.name}</h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default VideoList
