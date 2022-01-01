import { TweetInfo } from "../../types/Interfaces"
import TimeAgo from "timeago-react"

const TweetReplyForm = (props: any) => {

  const {tweetInfo} = props

  console.log(tweetInfo)

  const profilePicture = tweetInfo.user.profile.image
  const profilePictureDisplay = () => {
    return profilePicture ? profilePicture : './DefaultImage.jpeg'
  }

  return <>
  <div className="replyRecipientCard">
    <div className="replyRecipientImage">
      <img src={profilePictureDisplay()} />
    </div>
    <div className="replyRecipientInfo">
      <div className="replyNameAndTime">
        <div>{tweetInfo.user.name} </div> @{tweetInfo.user.username}
        <TimeAgo datetime={props.tweetInfo.createdAt}/>  
      </div>  
      <div className="replyRecipientTweet" >
        {tweetInfo.contents}
      </div>
        
      
    </div >
      
  </div>
  
  </>
}

export default TweetReplyForm