import { useState, useEffect } from "react"
import TrendingCard from "./TrendingCard"

const Trending = () => {

  const [loading, setLoading] = useState(Boolean)
  const [trending, setTrending] = useState(Object)

  const apiURL = process.env.NODE_ENV == "production" ?  process.env.prodURL : process.env.devURL



  const getTrendingTopics = async () => {
    setLoading(true)
    const response = await fetch (`${apiURL}/trending`)
    const json = await response.json()
    setTrending(json)
    setLoading(false)
  }

  useEffect(() => {
      getTrendingTopics()
  }, [trending])


if (trending){

  const trendingTopics = Object.keys(trending)



  const trendingDisplay = trendingTopics.map((data: any) => {
    let key = data
    return <> 
    <TrendingCard key={key} data={data}/>
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
  return <> Loading...</>
} else {
  return <> There's been an error</>
}



  
}

export default Trending 