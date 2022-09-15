import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import "./MovieList.scss"
import { SwiperSlide, Swiper } from "swiper/react"
import { Link } from "react-router-dom"
import Button from "../button/Button"
import tmdbApi, { category } from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"
import MovieCard from "../movieCard/MovieCard"

const MovieList = (props) => {
  const [Items, setItems] = useState([])

  useEffect(() => {
    const getList = async () => {
      let response = null
      const params = {}

      if (props.type === "similar") {
        response = await tmdbApi.similar(props.category, props.id)
      }
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMovieList(props.type, { params })
          break
        default:
          response = await tmdbApi.getTvList(props.type, { params })
      }
      setItems(response.results)
    }
    getList()
  }, [])

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {Items.map((item, i) => (
          <SwiperSlide>
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
