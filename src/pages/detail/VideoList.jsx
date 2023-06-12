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
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
