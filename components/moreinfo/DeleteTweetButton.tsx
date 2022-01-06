import { useContext } from "react";
import { UserContext } from "../../pages/UserContext";
import { useRouter } from "next/router";

const DeleteTweetButton = (props: any) => {
  const router = useRouter();

  const { user } = useContext(UserContext);

  const { setStateChanged, tweetID } = props;

  const apiURL =
    process.env.NODE_ENV == "production"
      ? process.env.prodURL
      : process.env.devURL;

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
