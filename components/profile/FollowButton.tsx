import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../pages/UserContext"
import { useRouter } from "next/router"

const FollowButton = (props: any) => {

    const router = useRouter()

    const {user} = useContext(UserContext)

    const {setStateChanged, profileID, profileFollowing, profileFollowedBy, stateChanged} = props
    
    const [followState, setFollowState] = useState(Boolean)

    const currentUserID = user.id

   
      const retrieveFollowState = () => {
        if (profileFollowedBy.find((element: { id: any }) => element.id == currentUserID) == undefined){
          setFollowState(false)
        } else {
          setFollowState(true)
        }
      }
      useEffect(() => {
      retrieveFollowState(), [user, stateChanged]
    })
    

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
              followRecipient: profileID
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
              followRecipient: profileID
          })
        });
        setStateChanged('Unfollowed')
        setFollowState(false)
        }
      } else if (!user){
        router.push("/user/login")
      }
    }


  return <>
    {followState ? 
    <button className="whiteButton" onClick={(() => toggleFollow())}>
      Unfollow
    </button> 
    :
    <button className="blackButton" onClick={(() => toggleFollow())}>
      Follow
    </button>
    }
  </>
}

export default FollowButton