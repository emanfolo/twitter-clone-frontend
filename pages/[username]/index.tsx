import { useContext, useState, useEffect} from 'react'
import { UserContext } from '../UserContext'
import Router, { useRouter } from "next/router";

import { Like, Hashtag, User, Profile, TweetInfo, Retweet } from '../../types/Interfaces';
import ProfileCard from '../../components/profile/ProfileCard'
import FeedContainer from '../../components/profile/FeedContainer';

const Profile = () => {

  const {user, setUser} = useContext(UserContext)


  const [profile, setProfile] = useState<User>()
  const [loading, setLoading] = useState(Boolean)

  const router = useRouter()
  const { username } = router.query

  const [stateChanged, setStateChanged] = useState(String)


  const apiURL = process.env.NODE_ENV == "production" ?  process.env.prodURL : process.env.devURL


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
      }, [stateChanged, username])

    
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
  } else {
    return <> Hi </>
  }

  
};

export default Profile;