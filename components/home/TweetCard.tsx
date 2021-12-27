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
import RetweetButton from './RetweetButton';

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
        <RetweetButton tweetID={tweetInfo.id} notificationRecipient={tweetInfo.user.id} retweets={tweetInfo.retweets} />
        <LikeButton tweetID={tweetInfo.id} notificationRecipient={tweetInfo.user.id} likes={tweetInfo.likes} />
      </div>
  </div>
  </div>
  </>
  )
}

export default TweetCard
