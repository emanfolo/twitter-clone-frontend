import TweetCard from '../profile/TweetCard'
import { useState } from 'react'

import { Like, Hashtag, User, Profile, Tweet, TweetInfo, Retweet } from '../../types/Interfaces';


const FeedContainer = (props: any) => {

  const [tweetInput, setTweetInput] = useState(String)
  const [tweetButtonActive, setTweetButtonActive] = useState(Boolean)
  const [limit, setLimit] = useState(240)



  const {tweets, retweets, username, name, profileDetails} = props

  const {setButtonToggle, buttonToggle} = props

  const tweetsDisplay = tweets.map((data:any) => {

    const key = `tweet-${data.id}`
    return (
        <TweetCard 
        key={key} 
        tweetInfo={data} 
        profileDetails={profileDetails} 
        username={username} 
        name={name}
        buttonToggle={buttonToggle} 
        setButtonToggle={setButtonToggle}
        />
    )
  });

  return <>
  <div>
    {tweetsDisplay}
  </div>
  </>
  return <> Hi</>
}

export default FeedContainer