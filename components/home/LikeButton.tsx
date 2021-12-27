import { useState, useEffect } from "react";
import { UserContext } from '../../pages/UserContext'
import { useContext } from 'react'
import { Like, Hashtag, User, Profile, TweetInfo, Retweet } from "../../types/Interfaces";

interface Props {
  tweetID: number;
  notificationRecipient: number;
  likes: Array<Like>
}


const LikeButton = (props: Props) => {

    const {user, setUser} = useContext(UserContext)


    const [likedState, setLikedState] = useState(Boolean)

    const {tweetID, notificationRecipient, likes} = props


    const retrieveLikeState = () => {

      if (likes.find(like => like.userID == user.userDetails.id) == undefined){
        setLikedState(false)
      } else {
        setLikedState(true)
      }
    }

    useEffect(() => {
      retrieveLikeState(), [user]
    })

    const toggleLike = async (authToken: string) => {
      if (!likedState){
        const response = await fetch('http://localhost:4000/like/new', {
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
      setLikedState(true)

      } else if (likedState) {
        const response = await fetch('http://localhost:4000/like/delete', {
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
      setLikedState(false)
      }
    }


  return (
    <>
      {likedState ? <button style={{color: 'red'}} onClick={(()=> toggleLike(user.accessToken))}> 
      Like {likes.length} 
      </button> : <button onClick={(()=> toggleLike(user.accessToken))}> 
      Like {likes.length} 
      </button> }
    </>
  )
}

export default LikeButton