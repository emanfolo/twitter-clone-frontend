// import ReactLinkify from 'react-linkify'
import TimeAgo from 'timeago-react'

import 'linkify-plugin-hashtag'
import Linkify from 'linkify-react'

import { useRouter } from "next/router";
import Link from 'next/link';

import { useEffect, useState } from 'react'

import { UserContext } from '../../pages/UserContext'
import { useContext } from 'react'

import LikeButton from '../profile/LikeButton';
import RetweetButton from '../profile/RetweetButton';

import { Like, Hashtag, User, Profile, TweetInfo, Retweet, Tweet} from "../../types/Interfaces";


const TweetCard = (props: any) => {

  const router = useRouter()

  const linkProps = {
  onClick: (event: any) => {
    const tag = event.target.href.split('#')[1]
    router.push(`http://localhost:3000/explore/hashtag/${tag}`)
   },
  }


  const contentsParser = (tweetInfo: Tweet) => {
    if(tweetInfo.hashtags.length == 0) {
      return tweetInfo.contents
    } else if (tweetInfo.hashtags.length > 0 && tweetInfo.contents) {
      return <Linkify options={{attributes: linkProps}}>{tweetInfo.contents}</Linkify>
  }
}

  const {tweetInfo, retweetInfo, setStateChanged}  = props
  

  const profilePage = `http://localhost:3000/${tweetInfo.user.username}`
  const profilePicture = tweetInfo.user.profile.image
  const profilePictureDisplay = () => {
    return profilePicture ? profilePicture : './DefaultImage.jpeg'
  }


  return (
  <> 
  <div className='tweetCard'>
    {/* <pre>{JSON.stringify(tweetInfo, null, 2)}</pre>    */}
      {retweetInfo ? <div >{`${retweetInfo.user.name} Retweeted`}</div> : <></> }
      <div className='nameAndTime'>
        <Link href={profilePage}>
          <div className='tweetCardImage'>
          <img src={profilePictureDisplay()} height={30} width={30} />
          <div>
            <strong>{tweetInfo.user.name}</strong> 
            @{tweetInfo.user.username}
          </div>
          <TimeAgo datetime={tweetInfo.createdAt}/>
          </div>
        </Link>
      </div>
      <div className='tweetCardContents' >
        {contentsParser(tweetInfo)}
      </div>
      <div className='tweetCardButtons' >
        <RetweetButton tweetID={tweetInfo.id} notificationRecipient={tweetInfo.user.id} retweets={tweetInfo.retweets} setStateChanged={setStateChanged}/>
        <LikeButton tweetID={tweetInfo.id} notificationRecipient={tweetInfo.user.id} likes={tweetInfo.likes} setStateChanged={setStateChanged}/>
      </div>
  </div>
  </>
  )
}

export default TweetCard
