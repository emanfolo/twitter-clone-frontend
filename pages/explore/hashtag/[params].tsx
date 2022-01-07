import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import Router, { useRouter } from "next/router";
import TweetCard from "../../../components/profile/TweetCard";

import {
  Like,
  Hashtag,
  User,
  Profile,
  TweetInfo,
  Retweet,
  Tweet,
} from "../../../types/Interfaces";
import SearchBar from "../../../components/explore/SearchBar";
import { CircularProgress } from "@material-ui/core";

const HashtagSearch = () => {
  const [hashtagTweets, setHashtagTweets] = useState<Array<Tweet>>([]);
  const [stateChanged, setStateChanged] = useState(String);
  const [loading, setLoading] = useState(Boolean);

  const router = useRouter();
  const { params } = router.query;
  const apiURL =
    process.env.NODE_ENV == "production"
      ? "https://twitter-clone-backend-ef.herokuapp.com"
      : "http://localhost:4000";

  const tweetsByHashtag = async () => {
    if (params != undefined) {
      setLoading(true);
      const response = await fetch(`${apiURL}/hashtag/${params}`);
      const json = await response.json();
      console.log(json);
      setHashtagTweets(json);
      setLoading(false);
    }
  };

  useEffect(() => {
    tweetsByHashtag();
  }, [stateChanged, params]);

  const tweetsDisplay = hashtagTweets.map((data: any) => {
    if (data.type == "Tweet") {
      const key = `tweet-${data.id}`;
      return (
        <TweetCard
          key={key}
          tweetInfo={data.tweet}
          setStateChanged={setStateChanged}
          stateChanged={stateChanged}
        />
      );
    }
  });

  const { user, setUser } = useContext(UserContext);
  if (hashtagTweets) {
    return (
      <>
        <div className="homeHeading">
          <h2>Search results</h2>
        </div>
        <div style={{ marginTop: "12%" }}>{tweetsDisplay}</div>
      </>
    );
  } else if (loading) {
    return (
      <>
        {" "}
        <div className="loadingSpinner">
          <CircularProgress />{" "}
        </div>{" "}
      </>
    );
  } else if (!hashtagTweets) {
    return (
      <>
        <div className="nothingToSee">
          <h2>No results found</h2>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="nothingToSee">
          <h2>There&apos;s been an error</h2>
        </div>
      </>
    );
  }
};

export default HashtagSearch;
