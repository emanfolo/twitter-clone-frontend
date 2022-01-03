import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../pages/UserContext"
import { useRouter } from "next/router"

const FollowButton = (props: any) => {

    const router = useRouter()

    const {user} = useContext(UserContext)

    const {setStateChanged, profileID, profileFollowing, profileFollowedBy} = props
    
    const [followState, setFollowState] = useState(Boolean)

    const currentUserID = user.userDetails.id

    if (user){
      const retrieveLikeState = () => {
        if (profileFollowedBy.find((element: { id: any }) => element.id == currentUserID) == undefined){
          setFollowState(false)
        } else {
          setFollowState(true)
        }
      }
      useEffect(() => {
      retrieveLikeState(), [user]
    })
    }

    

    const toggleFollow = async () => {
      if (user){
        const authToken = user.accessToken
        if (!followState){
          const response = await fetch('http://localhost:4000/follow/new', {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`
            },
          body: JSON.stringify( {
              followRecipient: profileID
          })
        });
        setStateChanged('Followed')
        setFollowState(true)

        } else if (followState) {
          const response = await fetch('http://localhost:4000/follow/delete', {
          method: 'DELETE',
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`
            },
          body: JSON.stringify( {
              followRecipient: profileID
          })
        });
        setStateChanged('Unfollowed')
        setFollowState(false)
        }
      } else if (!user){
        console.log("please log in")
        router.push("http://localhost:3000/user/login")
      }
    }


  return <>
    {followState ? 
    <button className="unfollowButton" onClick={(() => toggleFollow())}>
      Unfollow
    </button> 
    :
    <button className="followButton" onClick={(() => toggleFollow())}>
      Follow
    </button>
    }
  </>
}

export default FollowButton