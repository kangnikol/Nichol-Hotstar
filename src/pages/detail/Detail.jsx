import React, { Fragment, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import apiConfig from "../../api/apiConfig"
import tmdbApi, { category as cate } from "../../api/tmdbApi"
import VideoList from "./VideoList"
import MovieList from "../../components/movieList/MovieList"
import moment from "moment/moment"
import Button from "../../components/button/Button"
import { Dialog, Transition } from "@headlessui/react"

const Detail = () => {
  const { category, id } = useParams()
  const [item, setItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)
  const iframeRef = useRef(null)

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} })
      setItem(response)
      window.scrollTo(0, 0)
    }

    getDetail()
  }, [category, id])

  useEffect(() => {
    const setModalContent = async () => {
      if (item) {
        const videos = await tmdbApi.getVideos(cate.movie, item.id)

        if (videos.results.length > 0) {
          const videoSrc =
            "https://www.youtube.com/embed/" + videos.results[0].key
          iframeRef.current.setAttribute("src", videoSrc)
        } else {
          iframeRef.current.innerHTML = "No trailer"
        }
      }
    }

    if (isModalOpen && item) {
      setModalContent()
    }
  }, [isModalOpen, item])

  const openModal = () => {
    setIsModalOpen(true)
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
                        {lang.english_name},
                      </span>
                    ))}
                  </div>
                  <div className="overview text-white pt-4 flex flex-warp">
                    {item.overview}
                  </div>
                </div>
                <div>
                  <Button
                    className="text-white flex items-center gap-4 text-xl"
                    onClick={openModal}
                  >
                    <i className="fa-solid fa-play text-3xl"></i>
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
            <TrailerDialog
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              item={item.id}
              ref={modalRef}
              iframeRef={iframeRef}
            />
          </div>
        </>
      )}
    </>
  )
}

const TrailerDialog = React.forwardRef(
  ({ isOpen, onClose, item, iframeRef }, ref) => {
    useEffect(() => {
      const setModalContent = async () => {
        if (item) {
          const videos = await tmdbApi.getVideos(cate.movie, item.id)

          if (videos.results.length > 0) {
            const videoSrc =
              "https://www.youtube.com/embed/" + videos.results[0].key
            iframeRef.current.src = videoSrc
          } else {
            iframeRef.current.src = ""
          }
        }
      }

      if (isOpen && item) {
        setModalContent()
      }
    }, [isOpen, item, iframeRef])

    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          open={isOpen}
          onClose={onClose}
          ref={ref}
          id={item.id}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-1/2 h-1/2 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center pb-4 font-medium leading-6 text-gray-900"
                  >
                    Movies Trailer
                  </Dialog.Title>
                  <div className="bg-white border rounded-lg p-8 w-full">
                    <iframe
                      ref={iframeRef}
                      width="100%"
                      height="250px"
                      title="trailer"
                    ></iframe>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  }
)

export default Detail
