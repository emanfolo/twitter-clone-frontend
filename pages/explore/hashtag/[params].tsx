import { useContext, useState, useEffect} from 'react'
import { UserContext } from '../../UserContext'
import Router, { useRouter } from "next/router";
import TweetCard from '../../../components/profile/TweetCard'

import { Like, Hashtag, User, Profile, TweetInfo, Retweet, Tweet } from "../../../types/Interfaces";
import SearchBar from '../../../components/explore/SearchBar';


const HashtagSearch = () => {

  const [hashtagTweets, setHashtagTweets ] = useState<Array<Tweet>>([])
  const [stateChanged, setStateChanged] = useState(String)


  const router = useRouter()
  const { params } = router.query
  const apiURL = process.env.NODE_ENV == "production" ?  process.env.prodURL : process.env.devURL


  const tweetsByHashtag = async () => {
    if (params != undefined) {
      console.log(params)
      const response = await fetch(`${apiURL}/hashtag/${params}`)
      const json = await response.json()
      console.log(json)
      setHashtagTweets(json)
    }
  }

  useEffect(() => {
    tweetsByHashtag();
    }, [stateChanged, params])

   const tweetsDisplay = hashtagTweets.map((data:any) => {
    if(data.type == "Tweet"){
      const key = `tweet-${data.id}`
    return (
        <TweetCard 
        key={key} 
        tweetInfo={data.tweet}
        setStateChanged={setStateChanged}
        stateChanged={stateChanged}
        />
    )
    }
    
  });


  const {user, setUser} = useContext(UserContext)

  return (
  <>
    <div>{tweetsDisplay}</div>
  </>
  ); 
};

export default HashtagSearch;