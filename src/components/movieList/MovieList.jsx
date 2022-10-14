import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
// import "./MovieList.scss"
import tmdbApi, { category } from "../../api/tmdbApi"
import MovieCard from "../movieCard/MovieCard"
import Slider from "react-slick"

const MovieList = (props) => {
  const [Items, setItems] = useState([])

  const settings = {
    className: "text-white",
    centerMode: true,
    Infinity: true,
    autoplay: false,
    centerPadding: "60px",
    slidesToShow: 8,
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }

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
      <Slider {...settings}>
        {Items.map((item, i) => (
          <div className="w-2/5 lg:w-[15%] px-1" key={i}>
            <MovieCard item={item} category={props.category} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default MovieList
