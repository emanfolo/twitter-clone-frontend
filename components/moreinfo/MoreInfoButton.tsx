import { useState } from "react"
import { UserContext } from '../../pages/UserContext'
import { useContext } from 'react'
import DeleteTweetButton from "./DeleteTweetButton"
import MiniFollowButton from "./MiniFollowButton"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"


const MoreInfoButton = (props: any) => {

  const {user} = useContext(UserContext)
  const [modalOpen, setModalOpen] = useState(false)

  const {tweetCreatorID, tweetID, setStateChanged, stateChanged, following, followedBy} = props
  const currentUserID = user.id

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
    <MiniFollowButton following={following} followedBy={followedBy} tweetCreatorID={tweetCreatorID} setStateChanged={setStateChanged} stateChanged={stateChanged} />
  }

  return <>
    <div className="dropdown">
      <button className="dropbtn">{<MoreHorizIcon />}</button>
      <div className="dropdown-content">
        {displayDeleteOrFollowButton()}
      </div>
    </div>
     

  </>
}

export default MoreInfoButton