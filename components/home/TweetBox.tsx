import React from 'react'

// interface Props {
  
// }





const TweetBox = (props:any) => {

  const {tweetInput, setTweetInput, tweetButtonActive, setTweetButtonActive, limit, setLimit} = props

  const trackTweetButtonState = () => {
    if (tweetInput.length > 0) {
      setTweetButtonActive(true)
    } else if (tweetInput.length == 0) {
      setTweetButtonActive(false)
    }
  }
  
  trackTweetButtonState();

  const trackWordLimit = () => {
    let remainingWords = (240 - tweetInput.length)
    setLimit(remainingWords)
  }
  
  trackWordLimit()

  return (
    <>
    <div className="wrapper">
    <div className="input-box">
      <textarea className="tweet-area" placeholder="What's happening" maxLength={240} onChange={(e)=> {setTweetInput(e.target.value)}}>
      </textarea>
    </div>
    <div className="bottom">
      <div className="content">
        <span className="counter">{limit}</span>
        {tweetButtonActive ? <button className="TweetButton active">Tweet</button> : <button className="TweetButton">Tweet</button>}
      </div>
      
    </div>
  </div>
  </>
  )
}

export default TweetBox
