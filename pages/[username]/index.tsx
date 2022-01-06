import { useContext, useState, useEffect} from 'react'
import { UserContext } from '../../context/UserContext'
import Router, { useRouter } from "next/router";

import { Like, Hashtag, User, Profile, TweetInfo, Retweet } from '../../types/Interfaces';
import ProfileCard from '../../components/profile/ProfileCard'
import FeedContainer from '../../components/profile/FeedContainer';
import { CircularProgress } from '@material-ui/core';

const Profile = () => {

  const {user, setUser} = useContext(UserContext)


  const [profile, setProfile] = useState<User>()
  const [loading, setLoading] = useState(Boolean)

  const router = useRouter()
  const { username } = router.query

  const [stateChanged, setStateChanged] = useState(String)


  const apiURL = process.env.NODE_ENV == "production" ?  "https://twitter-clone-backend-ef.herokuapp.com" : "http://localhost:4000"


  const getProfile = async () => {
    setLoading(true)
    const url = `${apiURL}/profile/${username}`
    const res = await fetch(url, { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });
    const json = await res.json();
    setProfile(json);
    setLoading(false);
  }
  
    useEffect(() => {
      getProfile();
      }, [stateChanged])

    
  if(profile){
    return (
    <>
      <div>
        <ProfileCard profile={profile} setStateChanged={setStateChanged} stateChanged={stateChanged}/>
      </div>
      <div>
        <FeedContainer setStateChanged={setStateChanged} stateChanged={stateChanged} />
      </div>
    </>
    ); 
  } else if(loading){
  return <><div className="loadingSpinner"><CircularProgress /> </div>   </>
} else if (!profile){
  return <> 
  <div className="nothingToSee">
      <h2>
        No account such exists, please try another username
      </h2>
    </div>
  </>
} else {
  return <> 
  <div className="nothingToSee">
      <h2>
        There&apos;s been an error
      </h2>
    </div>
  </>
}

  
};

export default Profile;