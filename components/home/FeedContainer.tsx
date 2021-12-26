import TweetCard from './TweetCard'
import TweetBox from './TweetBox'
import { useState } from 'react'

interface User {
  id: number;
  name: string;
  username: string;
  createdAt?: string;
  profile: Profile;
  tweets?: Array<Tweet>;
  followedBy?: Array<User>;
  following: Array<User>;
}

interface Profile {
  id?: number;
  image?: string;
  header_image?: string;
  bio?: string;
}

interface Hashtag {
  id: number;
  contents: string;
  tweets?: Tweet;
}

interface Tweet {
  contents?: string;
  createdAt: Date;
  hashtags: Array<Hashtag>;
  id: number;
  image?: string;
  user: User;
}

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