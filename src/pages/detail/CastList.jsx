import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import tmdbApi from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"

const CastList = (props) => {
  const { category } = useParams()
  const [casts, setCasts] = useState([])
  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, props.id)
      setCasts(res.cast.slice(0, 5))
    }
    getCredits()
  }, [category, props.id])
  return (
    <div className="casts">
      {casts.map((item, i) => (
        <div className="casts-item" key={i}>
          <div
            className="casts-item-img"
            style={{
              backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`,
            }}
          ></div>
          <p className="casts-item-name">{item.name}</p>
        </div>
      ))}
    </div>
  )
}

export default CastList
