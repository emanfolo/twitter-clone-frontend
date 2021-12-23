import React from 'react'

// interface Props {
  
// }





const TweetBox = (props:any) => {

  const {tweetInput, setTweetInput, tweetButtonActive, setTweetButtonActive} = props

  console.log(tweetInput)

  return (
    <>
    <div className="wrapper">
    <div className="input-box">
      <textarea className="tweet-area" placeholder="What's happening" onChange={(e)=> {setTweetInput(e.target.value)}}>
      </textarea>
    </div>
    <div className="bottom">
      <div className="content">
        <span className="counter">100</span>
        <button className="TweetButton">Tweet</button>
      </div>
      
    </div>
  </div>
  </>
  )
}

export default TweetBox
