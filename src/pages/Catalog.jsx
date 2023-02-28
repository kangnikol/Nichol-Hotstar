import React from "react"

import { useParams } from "react-router-dom"
import PageHeader from "../components/pageHeader/PageHeader"
import { category as cate } from "../api/tmdbApi"
import MovieGrid from "../components/movieGrid/MovieGrid"

const Catalog = () => {
  const { category } = useParams()
  return (
    <>
      <PageHeader>{category === cate.movie ? "Movie" : "TV Series"}</PageHeader>
      <div className="h-max">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  )
}

export default Catalog
