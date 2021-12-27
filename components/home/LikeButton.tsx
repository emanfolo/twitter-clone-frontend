import { useState, useEffect } from "react";
import { UserContext } from '../../pages/UserContext'
import { useContext } from 'react'
import { useRouter } from "next/router";
import { Like, Hashtag, User, Profile, TweetInfo, Retweet } from "../../types/Interfaces";

interface Props {
  tweetID: number;
  notificationRecipient: number;
  likes: Array<Like>;
  setButtonToggle?: any;
}


const LikeButton = (props: Props) => {


    const router = useRouter()

    const {user, setUser} = useContext(UserContext)


    const [likedState, setLikedState] = useState(Boolean)

    const {tweetID, notificationRecipient, likes} = props
    const {setButtonToggle} = props




    if (user){
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
    }
    

    const toggleLike = async () => {
      if (user){
        const authToken = user.accessToken
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
        setButtonToggle("liked")
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
        setButtonToggle("unliked")
        setLikedState(false)
        }
      } else if (!user){
        console.log("please log in")
        router.push("http://localhost:3000/user/login")
      }
    }

  return (
    <>
      {likedState ? <button style={{color: 'red'}} onClick={(()=> toggleLike())}> 
      Like {likes.length} 
      </button> : <button onClick={(()=> toggleLike())}> 
      Like {likes.length} 
      </button> }
    </>
  )
}

export default LikeButton