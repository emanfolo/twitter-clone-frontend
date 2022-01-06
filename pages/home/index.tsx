import { useContext, useState, useEffect} from 'react'
import { UserContext } from '../UserContext'
import Router, { useRouter } from "next/router";
import FeedContainer from '../../components/home/FeedContainer';
import TweetBox from '../../components/home/TweetBox';

import { Like, Hashtag, User, Profile, TweetInfo, Retweet, Tweet } from "../../types/Interfaces";
import LogInForm from '../../components/login/LogInForm';



const Home = () => {

  const {user, setUser} = useContext(UserContext)


  const [tweetInput, setTweetInput] = useState(String)
  const [tweetButtonActive, setTweetButtonActive] = useState(Boolean)
  const [limit, setLimit] = useState(240)

  const [stateChanged, setStateChanged] = useState(String)

  console.log(user)

  if (user){
    return (
  <>
    <div className='homeHeading'>
      <h2>Home </h2>
    </div>
      <TweetBox tweetInput={tweetInput} 
      setTweetInput={setTweetInput} 
      tweetButtonActive={tweetButtonActive} 
      setTweetButtonActive={setTweetButtonActive} 
      limit={limit} 
      setLimit={setLimit}
      setStateChanged={setStateChanged}
      />
    <div>
    <div>
      <FeedContainer 
      setStateChanged={setStateChanged}
      stateChanged={stateChanged}/>
    </div>
    </div>
  </>
  ); 
  } else {
    return <> <LogInForm /></>
  }
    
}


export default Home;
