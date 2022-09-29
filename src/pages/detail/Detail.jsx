import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import apiConfig from "../../api/apiConfig"
import tmdbApi from "../../api/tmdbApi"
import VideoList from "./VideoList"
import MovieList from "../../components/movieList/MovieList"
import moment from "moment/moment"
import Button from "../../components/button/Button"
import Modal, { ModalContent } from "../../components/modal/Modal"

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
  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`)
    const videos = await tmdbApi.getVideos(category, item.id)
    if (videos.results.length < 1) {
      modal.querySelector("modal-content").innerHTML = "No Trailer"
    }
    const videSrc = "https://www.youtube.com/embed/" + videos.results[0].key
    modal.querySelector(".modal-content > iframe").setAttribute("src", videSrc)

    modal.classList.toggle("active")
  }
  const time_convert = (num) => {
    const hours = Math.floor(num / 60)
    const minutes = num % 60
    return hours + " hr " + minutes + " min"
  }
  return (
    <>
      {item && (
        <>
          <div className="p-5 lg:p-12">
            <div className="flex flex-row">
              <div className="card hidden lg:flex lg:flex-col lg:bg-black lg:rounded-l-lg lg:p-8 justify-between lg:basis-1/2">
                <div>
                  <h2 className="title text-white text-5xl font-semibold pb-4">
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
                  <div className="overview text-white pt-4 flex flex-warp">
                    {item.overview}
                  </div>
                </div>
                <div>
                  <Button
                    className="text-white flex items-center gap-4 text-xl"
                    onClick={setModalActive}
                  >
                    <i class="fa-solid fa-play text-3xl"></i>
                    <span>Watch Trailer</span>
                  </Button>
                </div>
              </div>
              <div className="relative lg:basis-1/2 h-full bg-center bg-no-repeat before:content-[''] before:bg-black before:absolute before:opacity-10 before:w-full before:h-full before:top-0 before:left-0 lg:after:content-[''] lg:after:top-0 lg:after:left-0 lg:after:absolute lg:after:w-full lg:after:h-full lg:after:bg-gradient-to-r lg:after:from-black lg:after:to-transparent">
                <img
                  className="rounded-r-lg"
                  src={apiConfig.originalImage(item.backdrop_path)}
                  alt="Poster"
                />
              </div>
            </div>
          </div>
          <div className="p-12 text-white">
            <div className="section mb-3">
              <div className="text-2xl mb-8">
                <h2>Related</h2>
              </div>
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section-header mb-8 text-2xl">
                <h2>More Like This</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
            <TrailerModal item={item.id} />
          </div>
        </>
      )}
    </>
  )
}

const TrailerModal = (props) => {
  const item = props.item

  const iframeRef = useRef(null)
  const onClose = () => iframeRef.current.setAttribute("src", "")
  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  )
}

export default Detail
