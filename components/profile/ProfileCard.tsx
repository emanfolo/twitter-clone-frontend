import { useContext, useState, useEffect} from 'react'
import { UserContext } from '../../pages/UserContext';
import Router, { useRouter } from "next/router";

import { Like, Hashtag, User, Profile, TweetInfo, Retweet } from '../../types/Interfaces';

interface Props {
  profile: Profile
}

const ProfileCard = (props: any) => {

  const {user, setUser} = useContext(UserContext)

  const { profile } = props

  console.log(props)

  return (
    <>
      <div style={{height: '60%'}}>
        <pre>{JSON.stringify(profile, null, 2)}</pre> 
      </div>
    </>
    )

}

export default ProfileCard
