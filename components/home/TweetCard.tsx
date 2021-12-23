// import ReactLinkify from 'react-linkify'
import TimeAgo from 'timeago-react'

import 'linkify-plugin-hashtag'
import Linkify from 'linkify-react'

import { useRouter } from "next/router";


interface User {
  id: number;
  name: string;
  username: string;
  createdAt?: string;
  profile: Profile;
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
}

interface TweetInfo {
  tweetInfo: {
  contents?: string;
  createdAt: Date;
  hashtags: Array<Hashtag>;
  id: number;
  image?: string;
  user: User;
  }
}


const TweetCard = (props: TweetInfo) => {

  const router = useRouter()

  const linkProps = {
  onClick: (event: any) => {
    const tag = event.target.href.split('#')[1]
    router.push(`http://localhost:3000/explore/hashtag/${tag}`)
   },
  }


  const contentsParser = (tweet: TweetInfo) => {
    if(tweet.tweetInfo.hashtags.length == 0) {
      return tweet.tweetInfo.contents
    } else if (tweet.tweetInfo.hashtags.length > 0 && tweet.tweetInfo.contents) {
      return <Linkify options={{attributes: linkProps}}>{tweet.tweetInfo.contents}</Linkify>
  }
}

  return (
  <> 
  <div>
    <strong>{props.tweetInfo.user.name}</strong> 
    @{props.tweetInfo.user.username}
  </div>
  <div>
    {contentsParser(props)}
  </div>
  <div>
    <TimeAgo datetime={props.tweetInfo.createdAt}/>
  </div>
  <br/>
  </>
  )
}

export default TweetCard
