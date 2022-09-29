import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import tmdbApi from "../../api/tmdbApi"
import VideoCard from "./VideoCard"

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
      <Swiper
        className="hidden lg:flex"
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={9}
      >
        {videos.map((item, i) => (
          <SwiperSlide key={i}>
            <VideoCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className="lg:hidden"
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={2}
      >
        {videos.map((item, i) => (
          <SwiperSlide key={i}>
            <VideoCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default VideoList
