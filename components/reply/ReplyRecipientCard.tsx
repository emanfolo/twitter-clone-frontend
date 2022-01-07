import TimeAgo from "timeago-react";

const ReplyRecipientCard = (props: any) => {
  const { tweetInfo } = props;

  const profilePicture = tweetInfo.user.profile.image;
  const profilePictureDisplay = () => {
    return profilePicture ? profilePicture : "./DefaultImage.jpeg";
  };

  return (
    <>
      <div className="replyRecipientImage">
        <img src={profilePictureDisplay()} />
      </div>
      <div className="replyRecipientInfo">
        <div className="replyNameAndTime">
          {tweetInfo.user.name} @{tweetInfo.user.username}
          <TimeAgo datetime={props.tweetInfo.createdAt} />
        </div>
        <div className="replyRecipientTweet">{tweetInfo.contents}</div>
      </div>
    </>
  );
};

export default ReplyRecipientCard;
