import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiConfig from "../../api/apiConfig"
import tmdbApi from "../../api/tmdbApi"
import VideoList from "./VideoList"
import MovieList from "../../components/movieList/MovieList"
import moment from "moment/moment"

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
  const time_convert = (num) => {
    const hours = Math.floor(num / 60)
    const minutes = num % 60
    return hours + " hr " + minutes + " min"
  }
  return (
    <>
      {item && (
        <>
          <div className="p-12">
            <div className="flex flex-row">
              <div className="card bg-black text-white rounded-l-lg p-8 basis-1/2">
                <h2 className="title text-5xl font-semibold pb-4">
                  {item.title || item.name}
                </h2>
                <div className="text-gray-400 font-semibold text-lg">
                  <span className="mr-1">
                    {item.runtime
                      ? time_convert(item.runtime)
                      : item.seasons[0].season_number + " Season"}{" "}
                    ‧
                  </span>
                  <span className="mr-1">
                    {moment(item.release_date || item.first_air_date).format(
                      "YYYY"
                    )}{" "}
                    ‧
                  </span>
                  {item.genres &&
                    item.genres.map((genre, i) => (
                      <span className="mr-1" key={i}>
                        {genre.name} ‧
                      </span>
                    ))}
                  {item.spoken_languages.map((lang, i) => (
                    <span className="mr-1" key={i}>
                      {lang.english_name} ‧
                    </span>
                  ))}
                  {item.adult === true ? "Adult" : "Kids"}
                </div>
                <div className="overview pt-4 flex flex-warp">
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
          <div className="p-12 text-white">
            <div className="mb-3 text-2xl">
              <h2>Related</h2>
            </div>
            <div className="section mb-3 flex flex-row">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section-header mb-3 text-2xl">
                <h2>More Like This</h2>
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
