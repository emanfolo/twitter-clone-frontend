import { CircularProgress } from "@material-ui/core"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import SearchBar from "../../components/explore/SearchBar"
import TweetCard from "../../components/profile/TweetCard"

const SearchResults = () => {

  const router = useRouter()
  const { params } = router.query

  const [searchResult, setSearchResults] = useState(Array)
  const [loading, setLoading] = useState(Boolean)
  const [stateChanged, setStateChanged] = useState(String)

  const apiURL = process.env.NODE_ENV == "production" ?  "https://twitter-clone-backend-ef.herokuapp.com" : "http://localhost:4000"


  const getSearchResults = async () => {
    setLoading(true)
    const response = await fetch (`${apiURL}/search`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
              params: params
          })
    })
    const json = await response.json();
    setSearchResults(json)
    setLoading(false)

  }


  useEffect(() => {
      getSearchResults()
      }, [params, stateChanged]
  )  


  if (searchResult.length > 0){

    const tweetsDisplay = searchResult.map((data:any) => {

    const key = `tweet-${data.id}`
    return (
        <TweetCard 
        key={key} 
        tweetInfo={data.tweet}
        retweetInfo={data.retweet}
        setStateChanged={setStateChanged}
        stateChanged={stateChanged}
        />
    )
  });
    return <> 
    <div className="homeHeading" >
      <h2>Search results</h2>
    </div>
    <div style={{marginTop: "12%"}}>
      {tweetsDisplay} 
    </div>
    
    </>
  } else if (!searchResult){
    return <> 
    <div className="nothingToSee">
      <h2>
        No results found
      </h2>
    </div>
    </>
  } else {
    return <>
    <div className="loadingSpinner"><CircularProgress /> </div> 
    </>
  }
  
}

export default SearchResults