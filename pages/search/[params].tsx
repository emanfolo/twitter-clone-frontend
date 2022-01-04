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

  const getSearchResults = async () => {
    setLoading(true)
    const response = await fetch ('http://localhost:4000/search', {
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
    <SearchBar/>
    {tweetsDisplay} 
    </>
  } else if (loading){
    return <>
    Loading...
    </>
  } else {
    return <> 
    <SearchBar/>
    No results found 
    </>
  }
  
}

export default SearchResults