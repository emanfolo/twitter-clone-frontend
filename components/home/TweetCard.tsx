// import ReactLinkify from 'react-linkify'
import TimeAgo from 'timeago-react'

import 'linkify-plugin-hashtag'
import Linkify from 'linkify-react'

import { useRouter } from "next/router";
import Link from 'next/link';

import { useEffect, useState } from 'react'

import { UserContext } from '../../pages/UserContext'
import { useContext } from 'react'

import LikeButton from './LikeButton';

import { Like, Hashtag, User, Profile, TweetInfo, Retweet } from "../../types/Interfaces";


const TweetCard = (props: TweetInfo) => {

  const {user, setUser} = useContext(UserContext)

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

const {tweetInfo} = props

// tweetInfo:
// contents: "but I dont F with da baby"
// createdAt: "2021-12-26T18:46:54.908Z"
// hashtags: []
// id: 74
// image: null
// likes: []
// retweets: []
// threadSuccessorID: null
// user:
// followedBy: (2) [{…}, {…}]
// following: [{…}]
// id: 37
// name: "Im a bot"
// profile:
// bio: "dont trust the process"
// header_image: "https://allhiphop.com/wp-content/uploads/2020/12/dababy-1-1-960x628.jpg.webp"
// id: 35
// image: "https://media.pitchfork.com/photos/5c7d4c1b4101df3df85c41e5/1:1/w_320/Dababy_BabyOnBaby.jpg"
// userID: 37
// [[Prototype]]: Object
// username: "bot419"





  const profilePage = `http://localhost:3000/profile/${tweetInfo.user.username}`
  const profilePicture = tweetInfo.user.profile.image

  

  return (
  <> 
  <div style={{"borderStyle": 'groove', width:'50%'}}>
    <div style={{margin: "25px"}}>
      <div>
        <Link href={profilePage}>
          <div style={{display: 'flex', justifyContent: 'left', alignItems: 'baseline', gap: '10px'}}>
          <img src={profilePicture} height={30} width={30} />
          <div>
            <strong>{tweetInfo.user.name}</strong> 
            @{tweetInfo.user.username}
          </div>
          <TimeAgo datetime={props.tweetInfo.createdAt}/>
          </div>
        </Link>
      </div>
      <div style={{margin: "5px" }}>
        {contentsParser(props)}
      </div>
      <div style={{display: 'flex', justifyContent: 'left', alignItems: 'baseline', gap: '10px'}}>
        <button>
            Retweet {tweetInfo.retweets.length}
        </button>
              <LikeButton tweetID={tweetInfo.id} notificationRecipient={tweetInfo.user.id} likes={tweetInfo.likes} />
      </div>
  </div>
  </div>
  </>
  )
}

export default TweetCard
