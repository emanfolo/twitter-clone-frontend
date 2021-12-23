import React from 'react'
import { UserContext } from '../../pages/UserContext'
import { useContext } from 'react'

// interface Props {
  
// }





const TweetBox = (props:any) => {

  const {user, setUser} = useContext(UserContext)


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

  const sendTweet = async (authToken: string) => {
    const response = await fetch('http://localhost:4000/tweet/new', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
      body: JSON.stringify( {
          contents: tweetInput,
          image: null,
       })
    });
    const json = await response.json()
    console.log(json)
  }

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
        {
        tweetButtonActive ? 
        (<button className="TweetButton active" onClick={()=> {sendTweet(user.accessToken)}}>Tweet</button>) 
        :
        (<button className="TweetButton">Tweet</button>
        )}
      </div>
      
    </div>
  </div>
  </>
  )
}

export default TweetBox
