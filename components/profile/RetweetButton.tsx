import { useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import {
  Like,
  Hashtag,
  User,
  Profile,
  TweetInfo,
  Retweet,
} from "../../types/Interfaces";
import AutorenewIcon from "@mui/icons-material/Autorenew";

interface Props {
  tweetID: number;
  notificationRecipient: number;
  retweets: Array<Retweet>;
  setStateChanged: Function;
}

const RetweetButton = (props: Props) => {
  const router = useRouter();

  const { user, setUser } = useContext(UserContext);

  const [retweetedState, setRetweetedState] = useState(Boolean);

  const { tweetID, notificationRecipient, retweets, setStateChanged } = props;

  const retrieveRetweetState = () => {
    if (retweets.find((retweet) => retweet.userID == user.id) == undefined) {
      setRetweetedState(false);
    } else {
      setRetweetedState(true);
    }
  };
  useEffect(() => {
    retrieveRetweetState(), [retweets];
  });

  const apiURL =
    process.env.NODE_ENV == "production"
      ? "https://twitter-clone-backend-ef.herokuapp.com"
      : "http://localhost:4000";

  const toggleRetweet = async () => {
    if (user) {
      const authToken = user.accessToken;
      if (!retweetedState) {
        const response = await fetch(`${apiURL}/retweet/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            tweetID: tweetID,
            notificationRecipient: notificationRecipient,
          }),
        });
        setStateChanged("Post retweeted");
        setRetweetedState(true);
      } else if (retweetedState) {
        const response = await fetch(`${apiURL}/retweet/delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            tweetID: tweetID,
            notificationRecipient: notificationRecipient,
          }),
        });
        setStateChanged("Post unretweeted");
        setRetweetedState(false);
      }
    } else if (!user) {
      router.push("/user/login");
    }
  };

  return (
    <>
      {retweetedState ? (
        <button
          style={{ color: "green", cursor: "pointer" }}
          onClick={() => toggleRetweet()}
        >
          <AutorenewIcon /> {retweets.length}
        </button>
      ) : (
        <button style={{ cursor: "pointer" }} onClick={() => toggleRetweet()}>
          <AutorenewIcon /> {retweets.length}
        </button>
      )}
    </>
  );
};

export default RetweetButton;
