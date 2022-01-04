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




  const getProfile = async () => {
    setLoading(true)
    const url = `http://localhost:4000/profile/${username}`
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

    

  console.log(profile)
  // Find out if a user is on their own profile page, and change the follow or edit display based on that

  if(profile){
    return (
    <>
      <div>
        <ProfileCard profile={profile} setStateChanged={setStateChanged}/>
      </div>
      <div>
        <FeedContainer />
      </div>
    </>
    ); 
  } else {
    return <> Hi </>
  }

  
};

export default Profile;