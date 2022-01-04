import { useContext } from "react";
import { UserContext } from "../../pages/UserContext";
import { useRouter } from "next/router";

const DeleteTweetButton = (props: any) => {

  const router = useRouter()

  const {user} = useContext(UserContext)

  const {setStateChanged, tweetID} = props

  const deleteTweet = async () => {
    if(user){
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
    } else if (!user){
        console.log("please log in")
        router.push("http://localhost:3000/user/login")
      }
    
  }


  return <>
    <button onClick={(() => deleteTweet())}> Delete </button>
  </>
}

export default DeleteTweetButton