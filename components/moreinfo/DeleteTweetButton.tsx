import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";

const DeleteTweetButton = (props: any) => {
  const router = useRouter();

  const { user } = useContext(UserContext);

  const { setStateChanged, tweetID } = props;

  const apiURL =
    process.env.NODE_ENV == "production"
      ? "https://twitter-clone-backend-ef.herokuapp.com"
      : "http://localhost:4000";

  const deleteTweet = async () => {
    if (user) {
      const authToken = user.accessToken;
      const response = await fetch(`${apiURL}/tweet/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          tweetID: tweetID,
        }),
      });
      setStateChanged(`Tweet-${tweetID} deleted`);
    } else if (!user) {
      console.log("please log in");
      router.push("/user/login");
    }
  };

  return (
    <>
      <button onClick={() => deleteTweet()}> Delete </button>
    </>
  );
};

export default DeleteTweetButton;
