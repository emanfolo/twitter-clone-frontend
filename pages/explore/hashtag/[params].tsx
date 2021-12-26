import { useContext, useState, useEffect} from 'react'
import { UserContext } from '../../UserContext'
import Router, { useRouter } from "next/router";
import TweetCard from '../../../components/home/TweetCard'



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
  likes: Array<Like>
  retweets: Array<Retweet>
}

interface Retweet {
  id: number
  userID: number
  user: User
  tweetID: number
  tweet: Tweet
}

interface Like {
  id: number
  userID: number
  user: User
  tweetID: number
  tweet: Tweet
}

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

   const tweetsDisplay = hashtagTweets.map((data) => {

    const key = `tweet-${data.id}`
    return (
    <>
      <div>
        <TweetCard key={key} tweetInfo={data} />
      </div>
    </>
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