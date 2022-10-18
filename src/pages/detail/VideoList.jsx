import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import tmdbApi from "../../api/tmdbApi"
import VideoCard from "./VideoCard"
import Slider from "react-slick"

const VideoList = (props) => {
  const settings = {
    className: "text-white",
    infinite: false,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 5,
  }

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
      <Slider {...settings}>
        {videos.map((item, i) => (
          <div key={i}>
            <VideoCard item={item} />
          </div>
        ))}
      </Slider>
    </>
  )
}

export default VideoList
