import { TweetInfo } from "../../types/Interfaces"
import TimeAgo from "timeago-react"
import ReplyRecipientCard from "./ReplyRecipientCard"
import { UserContext } from "../../pages/UserContext"
import { useContext, useState } from "react"
import ReplyTweetBox from "./ReplyTweetBox"

const TweetReplyForm = (props: any) => {

  const {user, setUser} = useContext(UserContext)

  const {tweetInfo, setStateChanged, toggleModalClass} = props

  console.log(tweetInfo)

  const profilePicture = user.userDetails.profile.image
  const profilePictureDisplay = () => {
    return profilePicture ? profilePicture : './DefaultImage.jpeg'
  }

  const [tweetInput, setTweetInput] = useState(String)
  const [tweetButtonActive, setTweetButtonActive] = useState(Boolean)
  const [limit, setLimit] = useState(240)




  return <>
  <div className="replyForm">
    <ReplyRecipientCard tweetInfo={tweetInfo} />
    <div className="dividerLine"> <hr/> </div>
    <div className="tweetReplyFormCurrentUser"> <img src={profilePictureDisplay()}/> </div>
    <div className="replyingToInfo"> Replying to <div>@{tweetInfo.user.username}</div> </div>
    <div className="tweetReplyForm">
      <ReplyTweetBox tweetInput={tweetInput} 
      setTweetInput={setTweetInput} 
      tweetButtonActive={tweetButtonActive} 
      setTweetButtonActive={setTweetButtonActive} 
      limit={limit}
      setLimit={setLimit}
      tweetID={tweetInfo.id} 
      setStateChanged={setStateChanged}
      toggleModalClass={toggleModalClass}/> 
    </div>
  </div>
  
  </>
}

export default TweetReplyForm