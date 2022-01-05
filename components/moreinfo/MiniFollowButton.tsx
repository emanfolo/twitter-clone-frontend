import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../pages/UserContext"
import { useRouter } from "next/router"

const MiniFollowButton = (props: any) => {

    const {following, followedBy, tweetCreatorID } = props

    const router = useRouter()

    const {user} = useContext(UserContext)

    const {setStateChanged, stateChanged} = props
    
    const [followState, setFollowState] = useState(Boolean)

    const currentUserID = user.id


    if (user){
      const retrieveFollowState = () => {
        if (followedBy.find((element: { id: any }) => element.id == currentUserID) == undefined){
          setFollowState(false)
        } else {
          setFollowState(true)
        }
      }
      useEffect(() => {
      console.log('resetting follow state')
      retrieveFollowState(), [stateChanged]
    })
    }
    
    const apiURL = process.env.NODE_ENV == "production" ?  process.env.prodURL : process.env.devURL


    const toggleFollow = async () => {
      if (user){
        const authToken = user.accessToken
        if (!followState){
          const response = await fetch(`${apiURL}/follow/new`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`
            },
          body: JSON.stringify( {
              followRecipient: tweetCreatorID
          })
        });
        setStateChanged('Followed')
        setFollowState(true)

        } else if (followState) {
          const response = await fetch(`${apiURL}/follow/delete`, {
          method: 'DELETE',
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`
            },
          body: JSON.stringify( {
              followRecipient: tweetCreatorID
          })
        });
        setStateChanged('Unfollowed')
        setFollowState(false)
        }
      } else if (!user){
        console.log("please log in")
        router.push("/user/login")
      }
    }


  return <>
    {followState ? 
    <button className="miniUnfollowButton" onClick={(() => toggleFollow())}>
      Unfollow
    </button> 
    :
    <button className="miniFollowButton" onClick={(() => toggleFollow())}>
      Follow
    </button>
    }
  </>
}

export default MiniFollowButton