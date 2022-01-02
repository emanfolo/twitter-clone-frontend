import { TweetInfo } from "../../types/Interfaces"
import TimeAgo from "timeago-react"
import ReplyRecipientCard from "./ReplyRecipientCard"
import { UserContext } from "../../pages/UserContext"
import { useContext, useState } from "react"
import ReplyTweetBox from "./ReplyTweetBox"
import Link from "next/link"

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

  console.log(tweetInfo)




  return <>
  <div className="replyForm">
    <ReplyRecipientCard tweetInfo={tweetInfo} />
    <div className="dividerLine"> <hr/> </div>
    <div className="tweetReplyFormCurrentUser"> <img src={profilePictureDisplay()}/> </div>
    <Link href={`/${tweetInfo.user.username}`}>
    <div className="replyingToInfo"> Replying to <div>@{tweetInfo.user.username}</div> </div>
    </Link>
    <div className="tweetReplyForm">
      <ReplyTweetBox tweetInput={tweetInput} 
      setTweetInput={setTweetInput} 
      tweetButtonActive={tweetButtonActive} 
      setTweetButtonActive={setTweetButtonActive} 
      limit={limit}
      setLimit={setLimit}
      tweetID={tweetInfo.id} 
      notificationRecipient={tweetInfo.user.id}
      setStateChanged={setStateChanged}
      toggleModalClass={toggleModalClass}/> 
    </div>
  </div>
  
  </>
}

export default TweetReplyForm