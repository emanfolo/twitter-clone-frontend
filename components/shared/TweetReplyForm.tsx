import { TweetInfo } from "../../types/Interfaces"
import TimeAgo from "timeago-react"
import ReplyRecipientCard from "./ReplyRecipientCard"
import { UserContext } from "../../pages/UserContext"
import { useContext } from "react"

const TweetReplyForm = (props: any) => {

  const {user, setUser} = useContext(UserContext)

  const {tweetInfo} = props

  console.log(tweetInfo)

  const profilePicture = user.userDetails.profile.image
  const profilePictureDisplay = () => {
    return profilePicture ? profilePicture : './DefaultImage.jpeg'
  }



  return <>
  <div className="replyForm">
    <ReplyRecipientCard tweetInfo={tweetInfo} />
    <div className="dividerLine"> I am a divider line</div>
    <div className="tweetReplyFormCurrentUser"> <img src={profilePictureDisplay()}/> </div>
    <div className="replyingToInfo"> Replying to <div>@{tweetInfo.user.username}</div> </div>
    <div className="tweetReplyForm">
      I am the tweet reply form
    </div>
  </div>
  
  </>
}

export default TweetReplyForm