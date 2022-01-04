import { useContext } from "react";
import { UserContext } from "../../pages/UserContext";

const DeleteTweetButton = (props: any) => {

  const {user} = useContext(UserContext)

  const {setStateChanged, tweetID} = props

  const deleteTweet = async () => {
    const authToken = user.accessToken
    const response = await fetch('http://localhost:4000/tweet/delete', {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`
            },
          body: JSON.stringify( {
              tweetID: tweetID
          })
        });
        setStateChanged(`Tweet-${tweetID} deleted`)
  }


  return <>
    <button onClick={(() => deleteTweet())}> Delete </button>
  </>
}

export default DeleteTweetButton