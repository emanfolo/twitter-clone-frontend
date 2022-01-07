import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";

const FollowButton = (props: any) => {
  const router = useRouter();

  const { user } = useContext(UserContext);

  const {
    setStateChanged,
    profileID,
    profileFollowing,
    profileFollowedBy,
    stateChanged,
  } = props;

  const [followState, setFollowState] = useState(Boolean);

  const currentUserID = user.id;

  const retrieveFollowState = () => {
    if (
      profileFollowedBy.find(
        (element: { id: any }) => element.id == currentUserID
      ) == undefined
    ) {
      setFollowState(false);
    } else {
      setFollowState(true);
    }
  };
  useEffect(() => {
    retrieveFollowState(), [user, stateChanged];
  });

  const apiURL =
    process.env.NODE_ENV == "production"
      ? "https://twitter-clone-backend-ef.herokuapp.com"
      : "http://localhost:4000";

  const toggleFollow = async () => {
    if (user) {
      const authToken = user.accessToken;
      if (!followState) {
        const response = await fetch(`${apiURL}/follow/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            followRecipient: profileID,
          }),
        });
        setStateChanged(`${profileID} followed`);
        setFollowState(true);
      } else if (followState) {
        const response = await fetch(`${apiURL}/follow/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            followRecipient: profileID,
          }),
        });
        setStateChanged(`${profileID} unfollowed`);
        setFollowState(false);
      }
    } else if (!user) {
      router.push("/user/login");
    }
  };

  return (
    <>
      {followState ? (
        <button className="whiteButton" onClick={() => toggleFollow()}>
          Unfollow
        </button>
      ) : (
        <button className="blackButton" onClick={() => toggleFollow()}>
          Follow
        </button>
      )}
    </>
  );
};

export default FollowButton;
