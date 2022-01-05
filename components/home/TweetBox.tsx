import React from 'react'
import { UserContext } from '../../pages/UserContext'
import { useContext } from 'react'


const TweetBox = (props:any) => {

  const {user, setUser} = useContext(UserContext)


  const {tweetInput, setTweetInput, tweetButtonActive, setTweetButtonActive, limit, setLimit} = props
  const {setStateChanged} = props

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

  const apiURL = process.env.NODE_ENV == "production" ?  process.env.prodURL : process.env.devURL


  const sendTweet = async (authToken: string) => {
    const response = await fetch(`${apiURL}/tweet/new`, {
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
    setTweetInput("")
    console.log(json)
    setStateChanged(`new tweet${json.id}`)
  }

  const profilePicture = user.profile.image

  const displayProfilePicture = () => { return profilePicture ? profilePicture : './DefaultImage.jpeg'}

  return (
    <>
    <div className="wrapper">
      <div className='tweet-area'>
        <div className='tweet-area-image'>
          <img src={displayProfilePicture()}/>
        </div>
        <div className='tweet-area-input'>
          <textarea placeholder="What's happening" maxLength={240} value={tweetInput} onChange={(e)=> {setTweetInput(e.target.value)}}>
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
        (<button className="TweetButton">Tweet</button>
        )}
      </div>
      
    </div>
  </div>
  </>
  )
}

export default TweetBox
