import TweetCard from '../profile/TweetCard'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import { Like, Hashtag, User, Profile, Tweet, TweetInfo, Retweet } from '../../types/Interfaces';


const FeedContainer = (props: any) => {

  const [feed, setFeed] = useState(Array)

  const [stateChanged, setStateChanged] = useState(String)

  const router = useRouter()
  const { username } = router.query

    
    const getFeed = async () => {
    const url = `http://localhost:4000/feed/${username}`
    const res = await fetch(url, { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });
    const json = await res.json();
    setFeed(json);
    console.log('api call')
  }


  useEffect(() => {
      getFeed()
      }, [stateChanged]
  )

  console.log(feed)



if (feed.length > 0){
  const tweetsDisplay = feed.map((data:any) => {

    const key = `tweet-${data.id}`
    return (
        <TweetCard 
        key={key} 
        tweetInfo={data.tweet}
        retweetInfo={data.retweet}
        setStateChanged={setStateChanged}
        />
    )
  });

  return <>
  <div>
    {tweetsDisplay}
  </div>
  </>
} else {
  return <> Please make some tweets</>
}
  
}

export default FeedContainer