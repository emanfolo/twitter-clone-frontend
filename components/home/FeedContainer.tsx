import TweetCard from './TweetCard'
import TweetBox from './TweetBox'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../pages/UserContext';

import { Like, Hashtag, User, Profile, Tweet, TweetInfo, Retweet } from '../../types/Interfaces';


const FeedContainer = (props: any) => {

  const {user, setUser} = useContext(UserContext)
  const [feed, setFeed] = useState(Array)
  

  const {stateChanged, setStateChanged} = props

  const apiURL = process.env.NODE_ENV == "production" ?  process.env.prodURL : process.env.devURL


  const getFeed = async () => {
    const authToken: string = user.accessToken
    const res = await fetch(`${apiURL}/feed`, { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      });
    const json = await res.json();
    setFeed(json);
  }


  useEffect(() => {
      getFeed()
      }, [stateChanged]
  )

if (feed.length > 0){
  const tweetsDisplay = feed.map((data: any) => {

    const key = `tweet-${data.id}`
    return (
        <TweetCard key={key} tweetInfo={data.tweet} retweetInfo={data.retweet} setStateChanged={setStateChanged}/>
    )
  });

  return <>
  <div style={{display: 'flex', 'flexDirection': 'column'}}>
    {tweetsDisplay}
  </div>
  </>
} else {
  return <> Please make some tweets</>
}

}

export default FeedContainer