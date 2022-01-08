import TweetCard from "./TweetCard";
import TweetBox from "./TweetBox";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";

import {
  Like,
  Hashtag,
  User,
  Profile,
  Tweet,
  TweetInfo,
  Retweet,
} from "../../types/Interfaces";
import { CircularProgress } from "@material-ui/core";

const FeedContainer = (props: any) => {
  const { user, setUser } = useContext(UserContext);
  const [feed, setFeed] = useState(Array);
  const [loading, setLoading] = useState(Boolean);

  const { stateChanged, setStateChanged } = props;

  const apiURL =
    process.env.NODE_ENV == "production"
      ? "https://twitter-clone-backend-ef.herokuapp.com"
      : "http://localhost:4000";

  const getFeed = async () => {
    setLoading(true);
    const authToken: string = user.accessToken;
    const res = await fetch(`${apiURL}/feed`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const json = await res.json();
    setFeed(json);
    setLoading(false);
  };

  useEffect(() => {
    getFeed();
  }, [stateChanged]);
  
  if (feed.length > 0) {
    const tweetsDisplay = feed.map((data: any) => {
      const key = `tweet-${data.id}`;
      return (
        <TweetCard
          key={key}
          tweetInfo={data.tweet}
          retweetInfo={data.retweet}
          setStateChanged={setStateChanged}
        />
      );
    });

    return (
      <>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {tweetsDisplay}
        </div>
      </>
    );
  } else if (feed == null) {
    return (
      <>
        {" "}
        <div className="nothingToSee" >
        <h2> Please make some tweets </h2>
        </div>{" "}
      </>
    );
  } else {
    return (
      <>
        {" "}
        <div className="loadingSpinner">
          <CircularProgress />{" "}
        </div>{" "}
      </>
    );}
};

export default FeedContainer;
