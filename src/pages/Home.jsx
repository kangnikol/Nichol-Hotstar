import React from "react"
import { Link } from "react-router-dom"
import { OutlineButton } from "../components/button/Button"

import HeroSlide from "../components/heroSlide/HeroSlide"
import MovieList from "../components/movieList/MovieList"

import { category, movieType, tvType } from "../api/tmdbApi"

const Home = () => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section-header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>
      </div>
      <div className="container">
        <div className="section mb-3">
          <div className="section-header mb-2">
            <h2>Top Rated Movie</h2>
            <Link to="/movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>
      </div>
      <div className="container">
        <div className="section mb-3">
          <div className="section-header mb-2">
            <h2>Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={movieType.popular} />
        </div>
      </div>
      <div className="container">
        <div className="section mb-3">
          <div className="section-header mb-2">
            <h2>Top Rated TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={movieType.top_rated} />
        </div>
      </div>
    </>
  )
}

export default Home
