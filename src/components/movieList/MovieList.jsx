import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
// import "./MovieList.scss"
import { SwiperSlide, Swiper } from "swiper/react"
import tmdbApi, { category } from "../../api/tmdbApi"
import MovieCard from "../movieCard/MovieCard"

const MovieList = (props) => {
  const [Items, setItems] = useState([])

  useEffect(() => {
    const getList = async () => {
      let response = null
      const params = {}

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMovieList(props.type, { params })
            break
          default:
            response = await tmdbApi.getTvList(props.type, { params })
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id)
      }
      setItems(response.results)
    }
    getList()
  })

  return (
    <div>
      <Swiper
        className="hidden sm:flex"
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={9}
      >
        {Items.map((item, i) => (
          <SwiperSlide className="w-2/5 sm:w-[15%]" key={i}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className="sm:hidden"
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={2}
      >
        {Items.map((item, i) => (
          <SwiperSlide className="w-2/5 sm:w-[15%]" key={i}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default MovieList
