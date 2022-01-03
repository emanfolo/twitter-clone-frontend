import { useContext, useState } from "react"
import { UserContext } from "../../pages/UserContext"

const FollowButton = (props: any) => {

    const {user, setUser} = useContext(UserContext)

    const {setStateChanged} = props


  return <>
    <button>
      Follow
    </button>
  </>
}

export default FollowButton