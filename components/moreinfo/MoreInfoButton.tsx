import { useState } from "react"
import { UserContext } from '../../pages/UserContext'
import { useContext } from 'react'

const MoreInfoButton = (props: any) => {

  const {user} = useContext(UserContext)
  const [modalOpen, setModalOpen] = useState(false)

  const {tweetCreatorID} = props
  const currentUserID = user.userDetails.id

  const toggleModalClass = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true)
  }

  const useModalClass = () => {
    return modalOpen ? "moreInfoModalOpen" : "moreInfoModalClosed"
  }

  console.log(tweetCreatorID)
  console.log(currentUserID)

  const displayDeleteOrFollowButton = () => {
    return tweetCreatorID == currentUserID ? <button> Delete Tweet</button> : <button> Follow/Unfollow </button>
  }

  return <>
    <div className="dropdown">
      <button className="dropbtn">...</button>
      <div className="dropdown-content">
        {displayDeleteOrFollowButton()}
      </div>
    </div>
     

  </>
}

export default MoreInfoButton