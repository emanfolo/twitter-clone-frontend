import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import Router, { useRouter } from "next/router";
import Link from "next/link";

import {
  Like,
  Hashtag,
  User,
  Profile,
  TweetInfo,
  Retweet,
} from "../../types/Interfaces";
import FollowButton from "./FollowButton";
import EditProfileButton from "./EditProfileButton";

interface Props {
  profile: Profile;
}

const ProfileCard = (props: any) => {
  const { user, setUser } = useContext(UserContext);

  const { profile, setStateChanged, stateChanged } = props;

  const profilePicture = profile.profile.image;
  const profilePictureDisplay = () => {
    return profilePicture ? profilePicture : "./DefaultImage.jpeg";
  };
  const headerImage = profile.profile.header_image
  const headerDisplay = () => {
    return headerImage ? headerImage : "https://twitter-clone-image-storage.s3.eu-west-2.amazonaws.com/084f78c13c722c81811f234ce88cd644.png"
  }
  const followOrEdit = () => {
    if (user.username == profile.username) {
      return (
        <>
          {" "}
          <EditProfileButton />{" "}
        </>
      );
    } else {
      return (
        <>
          {" "}
          <FollowButton
            profileFollowing={profile.following}
            profileFollowedBy={profile.followedBy}
            profileID={profile.id}
            setStateChanged={setStateChanged}
            stateChanged={stateChanged}
          />{" "}
        </>
      );
    }
  };

  return (
    <>
      <div className="profileCardContainer">
        <div className="headerImage">
          <img src={headerDisplay()} />
        </div>
        <div className="profilePicture">
          <img src={profilePictureDisplay()} />
        </div>
        <div className="bottomHalf">
          <div className="nameAndFollow">
            <Link href={`/${profile.username}`}>
              <div className="name">
                <strong>
                  {profile.name} <br />
                </strong>
                @{profile.username}
              </div>
            </Link>
            <div className="followOrEditButtonContainer">{followOrEdit()}</div>
          </div>
          <div className="bioAndFollowers">
            <div className="bio">{profile.profile.bio}</div>
            <div className="followingFollowers">
              <strong>{profile.following.length} </strong> {`Following `}
              <strong>{profile.followedBy.length} </strong>
              {`Followers `}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
