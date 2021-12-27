import { useContext, useState, useEffect} from 'react'
import { UserContext } from '../../pages/UserContext';
import Router, { useRouter } from "next/router";

import { Like, Hashtag, User, Profile, TweetInfo, Retweet } from '../../types/Interfaces';

const ProfileCard = () => {

  const {user, setUser} = useContext(UserContext)

  return (
    <>
      <div style={{height: '60%'}}>
        I Am the profile card
      </div>
    </>
    )

}

export default ProfileCard
