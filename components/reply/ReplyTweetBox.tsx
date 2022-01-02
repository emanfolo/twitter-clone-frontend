import React from 'react'
import { UserContext } from '../../pages/UserContext'
import { useContext } from 'react'

// interface Props {
  
// }





const ReplyTweetBox = (props:any) => {

  const {user, setUser} = useContext(UserContext)


  const {tweetInput, setTweetInput, tweetButtonActive, setTweetButtonActive, limit, setLimit, tweetID} = props
  const {setStateChanged, toggleModalClass} = props

  console.log(tweetID)

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
          replyTo: tweetID
       })
    });
    const json = await response.json()
    setTweetInput("")
    console.log(json)
    setStateChanged(`new tweet${json.id}`)
    toggleModalClass() 
  }

  const profilePicture = user.userDetails.profile.image

  const displayProfilePicture = () => { return profilePicture ? profilePicture : './DefaultImage.jpeg'}

  return (
    <>
    <div className="wrapper">
      <div className='tweet-area'>
        <div className='tweet-area-input'>
          <textarea placeholder="Tweet your reply" maxLength={240} value={tweetInput} onChange={(e)=> {setTweetInput(e.target.value)}}>
          </textarea>
        </div>
      </div>
      
    <div className="bottom">
      <div className="content">
        <span className="counter">{limit}</span>
        {
        tweetButtonActive ? 
        (<button className="TweetButton active" onClick={()=> {sendTweet(user.accessToken)}}>Tweet</button>) 
        :
        (<button className="TweetButton">Reply</button>
        )}
      </div>
      
    </div>
  </div>
  </>
  )
}

export default ReplyTweetBox