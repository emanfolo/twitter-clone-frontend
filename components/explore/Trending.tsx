import { CircularProgress } from "@material-ui/core"
import { useState, useEffect } from "react"
import TrendingCard from "./TrendingCard"

const Trending = () => {

  const [loading, setLoading] = useState(Boolean)
  const [trending, setTrending] = useState(Object)

  const apiURL = process.env.NODE_ENV == "production" ?  "https://twitter-clone-backend-ef.herokuapp.com" : "http://localhost:4000"



  const getTrendingTopics = async () => {
    setLoading(true)
    const response = await fetch (`${apiURL}/trending`)
    const json = await response.json()
    setTrending(json)
    setLoading(false)
  }

  useEffect(() => {
      getTrendingTopics()
  }, [])


if (trending){

  const trendingTopics = Object.keys(trending)

  let index = 0

  const trendingDisplay = trendingTopics.map((data: any) => {
    index += 1
    return <> 
    <TrendingCard key={index} data={data}/>
    </>
  })
  

  return <>
  <div className="trendingHeader">
    Trending topics
  </div>
  <div className="trendingContainer">
    {trendingDisplay}
  </div>
  </>
} else if(loading){
  return <>  <div className="homeHeading"><CircularProgress /> </div> </>
} else {
  return <> 
  <div className="nothingToSee">
      <h2>
        There&apos;s been an error
      </h2>
    </div>
  </>
}



  
}

export default Trending 