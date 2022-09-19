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
      <div className="container mx-auto">
        <div className="section mb-3">
          <div className="section-header py-3 flex justify-between items-center">
            <h2 className="text-white text-2xl">Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>
      </div>
      <div className="container mx-auto">
        <div className="section mb-3">
          <div className="section-header mb-8 flex justify-between items-center">
            <h2 className="text-white text-2xl">Top Rated Movie</h2>
            <Link to="/movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>
      </div>
      <div className="container mx-auto">
        <div className="section mb-3">
          <div className="section-header mb-8 flex justify-between items-center">
            <h2 className="text-white text-2xl">Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>
      </div>
      <div className="container mx-auto">
        <div className="section mb-3">
          <div className="section-header mb-8 flex justify-between items-center">
            <h2 className="text-white text-2xl">Top Rated TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
      </div>
    </>
  )
}

export default Home
