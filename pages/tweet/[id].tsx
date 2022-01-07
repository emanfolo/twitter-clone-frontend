import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import Router, { useRouter } from "next/router";

import { Tweet } from "../../types/Interfaces";
import { CircularProgress } from "@material-ui/core";
import TweetCard from "../../components/home/TweetCard";

const SingleTweet = () => {
  const router = useRouter();
  const { id } = router.query;

  const [tweetInfo, setTweetInfo] = useState<Tweet>();
  const [loading, setLoading] = useState(Boolean);
  const [stateChanged, setStateChanged] = useState("");

  const { user, setUser } = useContext(UserContext);

  const apiURL =
    process.env.NODE_ENV == "production"
      ? "https://twitter-clone-backend-ef.herokuapp.com"
      : "http://localhost:4000";

  const getTweet = async () => {
    if (id) {
      setLoading(true);
      const res = await fetch(`${apiURL}/tweet/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      setTweetInfo(json);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTweet();
  }, [tweetInfo, stateChanged]);

  if (tweetInfo) {
    return (
      <>
        <TweetCard
          tweetInfo={tweetInfo}
          setStateChanged={setStateChanged}
          stateChanged={stateChanged}
        />
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
  } else {
    return (
      <>
        {" "}
        <div className="nothingToSee">
          <h2>There&apos;s been an error</h2>
        </div>
      </>
    );
  }
};

export default SingleTweet;
