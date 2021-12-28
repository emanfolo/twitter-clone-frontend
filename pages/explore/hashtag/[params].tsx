import { useContext, useState, useEffect} from 'react'
import { UserContext } from '../../UserContext'
import Router, { useRouter } from "next/router";
import TweetCard from '../../../components/home/TweetCard'

import { Like, Hashtag, User, Profile, TweetInfo, Retweet, Tweet } from "../../../types/Interfaces";


const HashtagSearch = () => {

  const [hashtagTweets, setHashtagTweets ] = useState<Array<Tweet>>([])

  const router = useRouter()
  const { params } = router.query

  
  const tweetsByHashtag = async () => {
    if (params != undefined) {
      console.log(params)
      const response = await fetch(`http://localhost:4000/hashtag/${params}`)
      const json = await response.json()
      console.log(json)
      setHashtagTweets(json)
    }
  }

  useEffect(() => {
    tweetsByHashtag();
    }, [params])

   const tweetsDisplay = hashtagTweets.map((data:any) => {

    const key = `tweet-${data.id}`
    return (
        <TweetCard key={key} tweetInfo={data.tweet} />
    )
  });


  const {user, setUser} = useContext(UserContext)

  return (
  <>
    <h2>This is a hashtag search</h2>
    <div>{tweetsDisplay}</div>
  </>
  ); 
};

export default HashtagSearch;