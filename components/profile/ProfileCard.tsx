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

  const profilePicture = profile.profile.image
  const profilePictureDisplay = () => {
    return profilePicture ? profilePicture : './DefaultImage.jpeg'
  }

  const followOrEdit = () => {
    if (user.userDetails.username == profile.username){
      return 'Edit'
    } else {
      return 'Follow'
    }
  }

  return (
    <>
      <div className='profileCardContainer'>
        <div className='headerImage'> 
          <img src={profile.profile.header_image}/>
        </div>
        <div className='profilePicture'>
          <img src={profilePictureDisplay()}/>
        </div>
        <div className='bottomHalf'>
            <div className='nameAndFollow'>
              {/* <div className='profilePicture'>
                <img src={profilePictureDisplay()}/>
                
              </div> */}
              <div className='name'>
                <strong>{profile.name} <br/></strong>
                @{profile.username}
              </div>
              <div className='followButton'>
                <button>
                  {followOrEdit()}
                </button>
              </div>
              
            </div>
            <div className='bioAndFollowers'>
              <div className='bio'>
                {profile.profile.bio}
              </div>
              <div className='followingFollowers'>
                  <strong>{profile.following.length} </strong> {`Following `} 
                  <strong>{profile.followedBy.length} </strong>{`Followers `}
              </div>
            </div>
        </div>
        {/* <pre>{JSON.stringify(profile, null, 2)}</pre>  */}
      </div>
    </>
    )

}

export default ProfileCard
