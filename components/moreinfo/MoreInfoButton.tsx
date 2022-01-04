import { useState } from "react"
import { UserContext } from '../../pages/UserContext'
import { useContext } from 'react'
import DeleteTweetButton from "./DeleteTweetButton"

const MoreInfoButton = (props: any) => {

  const {user} = useContext(UserContext)
  const [modalOpen, setModalOpen] = useState(false)

  const {tweetCreatorID, tweetID, setStateChanged} = props
  const currentUserID = user.userDetails.id

  const toggleModalClass = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true)
  }

  const useModalClass = () => {
    return modalOpen ? "moreInfoModalOpen" : "moreInfoModalClosed"
  }

  const displayDeleteOrFollowButton = () => {
    return tweetCreatorID == currentUserID ? 
    <DeleteTweetButton tweetID={tweetID} setStateChanged={setStateChanged} /> 
    : 
    <button> Follow/Unfollow </button>
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