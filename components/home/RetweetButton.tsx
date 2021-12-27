import { useState, useEffect } from "react";
import { UserContext } from '../../pages/UserContext'
import { useContext } from 'react'
import { Like, Hashtag, User, Profile, TweetInfo, Retweet } from "../../types/Interfaces";

interface Props {
  tweetID: number;
  notificationRecipient: number;
  retweets: Array<Retweet>
}

const RetweetButton = (props: Props) => {

  const {user, setUser} = useContext(UserContext)

  const [retweetedState, setRetweetedState] = useState(Boolean)

  const {tweetID, notificationRecipient, retweets} = props

  const retrieveRetweetState = () => {

    if (retweets.find(retweet => retweet.userID == user.userDetails.id) == undefined){
      setRetweetedState(false)
    } else {
      setRetweetedState(true)
    }
  }

  useEffect(() => {
    retrieveRetweetState(), [user]
  })

  const toggleRetweet = async (authToken: string) => {
      if (!retweetedState){
        const response = await fetch('http://localhost:4000/retweet/new', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          },
        body: JSON.stringify( {
            tweetID: tweetID,
            notificationRecipient: notificationRecipient
        })
      });
      const json = await response.json()
      setRetweetedState(true)

      } else if (retweetedState) {
        const response = await fetch('http://localhost:4000/retweet/delete', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          },
        body: JSON.stringify( {
            tweetID: tweetID,
            notificationRecipient: notificationRecipient
        })
      });
      const json = await response.json()
      setRetweetedState(false)
      }
    }




  return (
    <>
      {retweetedState ? <button style={{color: 'green'}} onClick={(()=> toggleRetweet(user.accessToken))}> 
      Retweet {retweets.length} 
      </button> : <button onClick={(()=> toggleRetweet(user.accessToken))}> 
      Retweet {retweets.length} 
      </button> }
    </>
  )
}

export default RetweetButton