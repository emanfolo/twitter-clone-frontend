import TweetCard from "../profile/TweetCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  Like,
  Hashtag,
  User,
  Profile,
  Tweet,
  TweetInfo,
  Retweet,
} from "../../types/Interfaces";

const FeedContainer = (props: any) => {
  const [feed, setFeed] = useState(Array);

  const router = useRouter();
  const { username } = router.query;

  const { stateChanged, setStateChanged } = props;

  const apiURL =
    process.env.NODE_ENV == "production"
      ? "https://twitter-clone-backend-ef.herokuapp.com"
      : "http://localhost:4000";

  const getFeed = async () => {
    const url = `${apiURL}/feed/${username}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    setFeed(json);
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
          stateChanged={stateChanged}
        />
      );
    });

    return (
      <>
        <div>{tweetsDisplay}</div>
      </>
    );
  } else {
    return <> Please make some tweets</>;
  }
};

export default FeedContainer;
