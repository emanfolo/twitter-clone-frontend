const TweetCard = (props:any) => {

  return (
  <> 
  <div>
    <strong>{props.tweetInfo.user.name}</strong> 
    @{props.tweetInfo.user.username}
  </div>
  <div>
    {props.tweetInfo.contents}
  </div>
  <div>
    {props.tweetInfo.createdAt}
  </div>
  <br/>
  </>
  )
}

export default TweetCard
