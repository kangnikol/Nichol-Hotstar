import React, { useEffect, useRef, useState } from "react"
import SwiperCore, { Autoplay } from "swiper"
import Button, { OutlineButton } from "../button/Button"
import Modal, { ModalContent } from "../modal/Modal"
import { Swiper, SwiperSlide } from "swiper/react"
import tmdbApi, { category, movieType } from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"
// import "./HeroSlide.scss"
import { useHistory } from "react-router-dom"

const HeroSlide = () => {
  SwiperCore.use([Autoplay])
  const [movieItems, setMovieItems] = useState([])
  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 }
      try {
        const response = await tmdbApi.getMovieList(movieType.popular, {
          params,
        })
        setMovieItems(response.results.slice(0, 4))
        console.log(response)
      } catch {
        console.log("error")
      }
    }
    getMovies()
  }, [])

  return (
    <div className="hero-slide mb-12">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  )
}

const HeroSlideItem = (props) => {
  let history = useHistory()
  const item = props.item
  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  )
  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`)
    const videos = await tmdbApi.getVideos(category.movie, item.id)
    if (videos.results.length < 1) {
      modal.querySelector("modal-content").innerHTML = "No Trailer"
    }
    const videSrc = "https://www.youtube.com/embed/" + videos.results[0].key
    modal.querySelector(".modal-content > iframe").setAttribute("src", videSrc)

    modal.classList.toggle("active")
  }
  return (
    <div className="p-8 flex justify-between">
      <div className="card relative bg-black rounded-l-lg p-5">
        <div className="flex justify-between items-center h-full">
          <div className="relative w-99">
            <h2 className="title text-5xl text-white font-semibold pb-4">
              {item.title}
            </h2>
            <div className="overview text-white flex flex-warp">
              {item.overview}
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full bg-center bg-cover bg-no-repeat after:content-[''] after:top-0 after:left-0 after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-black after:to-transparent">
        <img
          className="rounded-r-lg h-1/4"
          src={apiConfig.originalImage(item.backdrop_path)}
          alt="Poster"
        />
      </div>
    </div>
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

export default HeroSlide
