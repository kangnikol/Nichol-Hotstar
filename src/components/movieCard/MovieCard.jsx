import React from "react"
// import "./MovieCard.scss"
import { Link } from "react-router-dom"
import Button from "../button/Button"
import { category } from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"

const MovieCard = (props) => {
  const item = props.item
  const link = "/" + category[props.category] + "/" + item.id
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path)
  return (
    <Link to={link}>
      <div
        className="movie-card relative bg-top bg-no-repeat pt-[160%] rounded-md mb-4 bg-cover before:content-[''] before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:bg-black before:opacity-0 before:[transition:opacity_0.3s_ease] hover:before:opacity-80"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Button className="hover:absolute hover:top-2/4 hover:left-2/4 [transform:translate(-50%,_-50%)_scale(0)] hover:[transition:transform_0.3s_ease,_shadow_0.3s_ease] hover:[transform:translate(-50%,_-50%)_scale(1)]">
          <i className="fa-solid fa-play text-white"></i>
        </Button>
      </div>
      <h3 className="text-white text-center">{item.title || item.name}</h3>
    </Link>
  )
}

export default MovieCard
