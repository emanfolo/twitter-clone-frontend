import { useContext, useState, useEffect} from 'react'
import { UserContext } from '../UserContext'
import Router, { useRouter } from "next/router";

import { Tweet } from '../../types/Interfaces';

const SingleTweet = () => {

  const router = useRouter()
  const { id } = router.query

  const [tweetInfo, setTweetInfo] = useState<Tweet>()


  const {user, setUser} = useContext(UserContext)

    const getTweet = async () => {
      if (id){
        const url = `http://localhost:4000/tweet/${id}`
      const res = await fetch(url, { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });
    const json = await res.json();
    setTweetInfo(json);
      }
    
    }
    
  

useEffect(() => {
    getTweet();
  }, [tweetInfo])


  return <>
  {tweetInfo?.contents}
  </>
}

export default SingleTweet