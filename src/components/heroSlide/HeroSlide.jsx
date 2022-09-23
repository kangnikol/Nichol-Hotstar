import React, { useEffect, useRef, useState } from "react"
import SwiperCore, { Autoplay, Navigation } from "swiper"
import Modal, { ModalContent } from "../modal/Modal"
import { Swiper, SwiperSlide } from "swiper/react"
import tmdbApi, { category, movieType } from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"
// import "./HeroSlide.scss"
import { Link, useHistory } from "react-router-dom"

const HeroSlide = () => {
  SwiperCore.use([Autoplay])
  const [movieItems, setMovieItems] = useState([])
  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 }
      try {
        const response = await tmdbApi.getMovieList(movieType.popular, {
          params,
        })
        setMovieItems(response.results.slice(0, 4))
        console.log(response)
      } catch {
        console.log("error")
      }
    }
    getMovies()
  }, [])

  return (
    <div className="hero-slide mb-12">
      <Swiper modules={[Navigation]} spaceBetween={0} slidesPerView={1}>
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const HeroSlideItem = (props) => {
  const item = props.item
  return (
    <div className="p-5 sm:p-12">
      <Link to={"/movie/" + item.id}>
        <div className="flex flex-row cursor-pointer">
          <div className="card hidden sm:flex sm:flex-col sm:bg-black sm:rounded-l-lg sm:p-8 sm:basis-1/2">
            <h2 className="title text-5xl text-white font-semibold pb-4">
              {item.title}
            </h2>
            <div className="overview text-white flex flex-warp">
              {item.overview}
            </div>
          </div>
          <div className="relative sm:basis-1/2 h-full bg-center bg-no-repeat before:content-[''] before:bg-black before:absolute before:opacity-10 before:w-full before:h-full before:top-0 before:left-0 sm:after:content-[''] sm:after:top-0 sm:after:left-0 sm:after:absolute sm:after:w-full sm:after:h-full sm:after:bg-gradient-to-r sm:after:from-black sm:after:to-transparent">
            <img
              className="sm:rounded-r-lg rounded-lg"
              src={apiConfig.originalImage(item.backdrop_path)}
              alt="Poster"
            />
            <p className="sm:hidden absolute text-4xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {item.title}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default HeroSlide
