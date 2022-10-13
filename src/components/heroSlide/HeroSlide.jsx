import React, { useEffect, useState } from "react"
import SwiperCore, { Autoplay, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import tmdbApi, { movieType } from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"
// import "./HeroSlide.scss"
import { Link } from "react-router-dom"

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
    <div className="p-5 lg:p-12">
      <Link to={"/movie/" + item.id}>
        <div className="flex flex-row cursor-pointer">
          <div className="card hidden lg:flex lg:flex-col lg:bg-black lg:rounded-l-lg lg:p-8 lg:basis-1/2">
            <h2 className="title text-5xl text-white font-semibold pb-4">
              {item.title}
            </h2>
            <div className="overview text-white flex flex-warp">
              {item.overview}
            </div>
          </div>
          <div className="relative lg:basis-1/2 h-full bg-center bg-no-repeat before:content-[''] before:bg-black before:absolute before:opacity-10 before:w-full before:h-full before:top-0 before:left-0 lg:after:content-[''] lg:after:top-0 lg:after:left-0 lg:after:absolute lg:after:w-full lg:after:h-full lg:after:bg-gradient-to-r lg:after:from-black lg:after:to-transparent">
            <img
              className="lg:rounded-r-lg rounded-lg"
              src={apiConfig.originalImage(item.backdrop_path)}
              alt="Poster"
            />
            <p className="lg:hidden absolute text-4xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {item.title}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default HeroSlide
