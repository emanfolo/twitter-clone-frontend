import { useState, useEffect } from "react"
import TrendingCard from "./TrendingCard"

const Trending = () => {

    console.log(window.innerHeight)


  const [loading, setLoading] = useState(Boolean)
  const [trending, setTrending] = useState(Object)


  const getTrendingTopics = async () => {
    setLoading(true)
    const response = await fetch ('http://localhost:4000/trending')
    const json = await response.json()
    setTrending(json)
    setLoading(false)
  }

  useEffect(() => {
      getTrendingTopics()
  }, [])


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
  {trendingDisplay}
  </>
} else if(loading){
  return <> Loading...</>
} else {
  return <> There's been an error</>
}



  
}

export default Trending 