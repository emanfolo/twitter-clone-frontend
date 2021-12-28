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
  <div style={{"borderStyle": 'groove', width:'100%'}}>
    {/* <pre>{JSON.stringify(tweetInfo, null, 2)}</pre>    */}
    <div style={{margin: "25px"}}>
      {retweetInfo ? <div>{`${retweetInfo.user.name} Retweeted`}</div> : <></> }
      <div>
        <Link href={profilePage}>
          <div style={{display: 'flex', justifyContent: 'left', alignItems: 'baseline', gap: '10px', cursor: 'pointer'}}>
          <img src={profilePictureDisplay()} height={30} width={30} />
          <div>
            <strong>{tweetInfo.user.name}</strong> 
            @{tweetInfo.user.username}
          </div>
          <TimeAgo datetime={tweetInfo.createdAt}/>
          </div>
        </Link>
      </div>
      <div style={{margin: "5px" }}>
        {contentsParser(tweetInfo)}
      </div>
      <div style={{display: 'flex', justifyContent: 'left', alignItems: 'baseline', gap: '10px'}}>
        <RetweetButton tweetID={tweetInfo.id} notificationRecipient={tweetInfo.user.id} retweets={tweetInfo.retweets} setStateChanged={setStateChanged}/>
        <LikeButton tweetID={tweetInfo.id} notificationRecipient={tweetInfo.user.id} likes={tweetInfo.likes} setStateChanged={setStateChanged}/>
      </div>
  </div>
  </div>
  </>
  )
}

export default TweetCard
