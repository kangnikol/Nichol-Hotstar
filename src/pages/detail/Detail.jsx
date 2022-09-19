import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiConfig from "../../api/apiConfig"
import tmdbApi from "../../api/tmdbApi"
import "./Detail.scss"
import VideoList from "./VideoList"
import MovieList from "../../components/movieList/MovieList"

const Detail = () => {
  const { category, id } = useParams()
  const [item, setItem] = useState(null)
  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} })
      setItem(response)
      window.scrollTo(0, 0)
    }
    getDetail()
  }, [category, id])
  return (
    <>
      {item && (
        <>
          <div className="p-12">
            <div className="flex flex-row">
              <div className="card bg-black rounded-l-lg p-8 basis-1/2">
                <h2 className="title text-5xl text-white font-semibold pb-4">
                  {item.title}
                </h2>
                <span>
                  {item.runtime},
                  {item.genres &&
                    item.genres.slice(0, 5).map((genre, i) => (
                      <span className="genres-item text-white" key={i}>
                        {genre.name}
                      </span>
                    ))}
                </span>
                <div className="overview text-white flex flex-warp">
                  {item.overview}
                </div>
              </div>
              <div className="relative basis-1/2 h-full bg-center bg-no-repeat after:content-[''] after:top-0 after:left-0 after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-black after:to-transparent">
                <img
                  className="rounded-r-lg"
                  src={apiConfig.originalImage(item.backdrop_path)}
                  alt="Poster"
                />
              </div>
            </div>
          </div>
          <p className="overview text-white">{item.overview}</p>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section-header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Detail
