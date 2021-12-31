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


const TweetCard = (props: any) => {

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

  const {tweetInfo, retweetInfo, setStateChanged} = props

  const profilePage = `http://localhost:3000/${tweetInfo.user.username}`
  const profilePicture = tweetInfo.user.profile.image
  const profilePictureDisplay = () => {
    return profilePicture ? profilePicture : './DefaultImage.jpeg'
  }

  

  return (
  <> 
  <div className='tweetCard'>
      {retweetInfo ? <div className='retweetInfo'>{`${retweetInfo.user.name} Retweeted`}</div> : <></> }
      <div className='userDetails'>
        <Link href={profilePage}>
          <>
          <div className='tweetCardImage'>
            <img src={profilePictureDisplay()} />
          </div>
          <div className='nameAndTime'>
            <div>{tweetInfo.user.name} </div>@{tweetInfo.user.username}
            <TimeAgo datetime={props.tweetInfo.createdAt}/>
          </div>
          </>
        </Link>
      </div>
      <div className='tweetCardContents' >
        {contentsParser(props)}
      </div>
      <div className='tweetCardButtons'>
        <RetweetButton tweetID={tweetInfo.id} notificationRecipient={tweetInfo.user.id} retweets={tweetInfo.retweets} setStateChanged={setStateChanged} />
        <LikeButton tweetID={tweetInfo.id} notificationRecipient={tweetInfo.user.id} likes={tweetInfo.likes} setStateChanged={setStateChanged} />
      </div>
  </div>
  </>
  )
}

export default TweetCard
