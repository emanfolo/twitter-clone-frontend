// import ReactLinkify from 'react-linkify'
import TimeAgo from "timeago-react";

import "linkify-plugin-hashtag";
import Linkify from "linkify-react";

import { useRouter } from "next/router";
import Link from "next/link";

import { useEffect, useState } from "react";

import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

import LikeButton from "./LikeButton";
import RetweetButton from "./RetweetButton";

import {
  Like,
  Hashtag,
  User,
  Profile,
  TweetInfo,
  Retweet,
} from "../../types/Interfaces";
import ReplyButton from "../reply/ReplyButton";
import MoreInfoButton from "../moreinfo/MoreInfoButton";

const TweetCard = (props: any) => {
  const { user, setUser } = useContext(UserContext);

  const router = useRouter();

  const linkProps = {
    onClick: (event: any) => {
      const tag = event.target.href.split("#")[1];
      router.push(`/explore/hashtag/${tag}`);
    },
  };

  const contentsParser = (tweet: TweetInfo) => {
    if (tweet.tweetInfo.hashtags.length == 0) {
      return tweet.tweetInfo.contents;
    } else if (
      tweet.tweetInfo.hashtags.length > 0 &&
      tweet.tweetInfo.contents
    ) {
      return (
        <Linkify options={{ attributes: linkProps }}>
          {tweet.tweetInfo.contents}
        </Linkify>
      );
    }
  };

  const { tweetInfo, retweetInfo, setStateChanged } = props;

  const profilePage = `/${tweetInfo.user.username}`;
  const profilePicture = tweetInfo.user.profile.image;
  const profilePictureDisplay = () => {
    return profilePicture ? profilePicture : "./DefaultImage.jpeg";
  };

  return (
    <>
      <div className="tweetCard">
        {retweetInfo ? (
          <Link href={`/${retweetInfo.user.username}`}>
            <div className="retweetInfo">{`${retweetInfo.user.name} Retweeted`}</div>
          </Link>
        ) : (
          <></>
        )}
        <div className="userDetails">
          <>
            <Link href={profilePage}>
              <div className="tweetCardImage">
                <img src={profilePictureDisplay()} />
              </div>
            </Link>
            <Link href={profilePage}>
              <div className="nameAndTime">
                <div>{tweetInfo.user.name} </div>@{tweetInfo.user.username}
                <TimeAgo datetime={props.tweetInfo.createdAt} />
              </div>
            </Link>
          </>
        </div>
        <div className="tweetCardContents">{contentsParser(props)}</div>
        <div className="tweetCardBottom">
          <ReplyButton
            tweetInfo={tweetInfo}
            setStateChanged={setStateChanged}
          />
          <RetweetButton
            tweetID={tweetInfo.id}
            notificationRecipient={tweetInfo.user.id}
            retweets={tweetInfo.retweets}
            setStateChanged={setStateChanged}
          />
          <LikeButton
            tweetID={tweetInfo.id}
            notificationRecipient={tweetInfo.user.id}
            likes={tweetInfo.likes}
            setStateChanged={setStateChanged}
          />
          <MoreInfoButton
            followedBy={tweetInfo.user.followedBy}
            following={tweetInfo.user.following}
            tweetID={tweetInfo.id}
            tweetCreatorID={tweetInfo.user.id}
            setStateChanged={setStateChanged}
          />
        </div>
      </div>
    </>
  );
};

export default TweetCard;
