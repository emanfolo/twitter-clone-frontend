import TweetCard from './TweetCard'
import TweetBox from './TweetBox'
import { useState } from 'react'

import { Like, Hashtag, User, Profile, Tweet, TweetInfo, Retweet } from '../../types/Interfaces';


const FeedContainer = (props: Array<Tweet>) => {

  const [tweetInput, setTweetInput] = useState(String)
  const [tweetButtonActive, setTweetButtonActive] = useState(Boolean)
  const [limit, setLimit] = useState(240)



  const tweetFeed = props

  const tweetsArray = Object.values(tweetFeed)

  const tweetsDisplay = tweetsArray.map((data) => {

    const key = `tweet-${data.id}`
    return (
        <TweetCard  key={key} tweetInfo={data} />
    )
  });

  return <>
  <div>
    <TweetBox tweetInput={tweetInput} setTweetInput={setTweetInput} tweetButtonActive={tweetButtonActive} setTweetButtonActive={setTweetButtonActive} limit={limit} setLimit={setLimit}/>
  </div>
  <div>
    {tweetsDisplay}
  </div>
  </>
}

export default FeedContainer