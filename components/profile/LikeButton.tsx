import { useState, useEffect } from "react";
import { UserContext } from '../../pages/UserContext'
import { useContext } from 'react'
import { useRouter } from "next/router";
import { Like, Hashtag, User, Profile, TweetInfo, Retweet } from "../../types/Interfaces";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
interface Props {
  tweetID: number;
  notificationRecipient: number;
  likes: Array<Like>;
  setStateChanged: Function;
}


const LikeButton = (props: Props) => {


    const router = useRouter()

    const {user, setUser} = useContext(UserContext)


    const [likedState, setLikedState] = useState(Boolean)

    const {tweetID, notificationRecipient, likes, setStateChanged} = props




    if (user){
      const retrieveLikeState = () => {

        if (likes.find(like => like.userID == user.id) == undefined){
          setLikedState(false)
        } else {
          setLikedState(true)
        }
      }
      useEffect(() => {
      retrieveLikeState(), [user]
    })
    }
    
    const apiURL = process.env.NODE_ENV == "production" ?  process.env.prodURL : process.env.devURL


    const toggleLike = async () => {
      if (user){
        const authToken = user.accessToken
        if (!likedState){
          const response = await fetch(`${apiURL}/like/new`, {
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
        setStateChanged("Post liked")
        setLikedState(true)

        } else if (likedState) {
          const response = await fetch(`${apiURL}/like/delete`, {
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
        setStateChanged("Post unliked")
        setLikedState(false)
        }
      } else if (!user){
        router.push("/user/login")
      }
    }

  return (
    <>
      {likedState ? <button style={{color: 'red', cursor: 'pointer'}} onClick={(()=> toggleLike())}> 
      <FavoriteBorderOutlinedIcon/> {likes.length} 
      </button> : <button style={{cursor: 'pointer'}}  onClick={(()=> toggleLike())}> 
      <FavoriteBorderOutlinedIcon/> {likes.length} 
      </button> }
    </>
  )
}

export default LikeButton