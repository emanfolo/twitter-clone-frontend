import { useContext, useState, useEffect} from 'react'
import { UserContext } from '../UserContext'
import Router, { useRouter } from "next/router";


interface User {
  id: number;
  name: string;
  username: string;
  createdAt?: string;
  profile: Profile;
  tweets?: Array<Tweet>;
  followedBy?: Array<User>;
  following: Array<User>;
}

interface Profile {
  id?: number;
  image?: string;
  header_image?: string;
  bio?: string;
}

interface Hashtag {
  id: number;
  contents: string;
  tweets?: Tweet;
}

interface Tweet {
  contents?: string;
  createdAt: Date;
  hashtags: Array<Hashtag>;
  id: number;
  image?: string;
  user: User;
}

const Home = () => {

  const router = useRouter()

  const {user, setUser} = useContext(UserContext)

  const [tweetFeed, setTweetFeed] = useState([])
  const [loading, setLoading] = useState(Boolean)

  const getTweetFeed = async (authToken: string) => {
    setLoading(true)
    const url = 'http://localhost:4000/feed'
    const res = await fetch(url, { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        }
       });
    const json = await res.json();
    console.log(json)
    setTweetFeed(json);
    setLoading(false);
  }

  // if(user){
  //   setInterval(getTweetFeed(user.accessToken), 15000)
  // )
  // }

 

  // const tweetDisplay = tweetFeed.tweets.map((tweet: Tweet) => (
  //   <>
  //     <div>{tweet.contents}</div>
  //     <div>
  //       <strong>{tweet.user.name}</strong> @{tweet.user.username}
  //     </div>
  //   </>
  // ));

  // if(!user) {
  //   router.push('/user/login')
  // }

  //Eventually I want to block users from ever going onto this page

  if(!user){
    return <></>
  }


  if(user){

     useEffect(() => {
    getTweetFeed(user.accessToken);
    }, [])

    return (
  <>
    <h1>This will be the home page with tweets</h1>
    <pre>{JSON.stringify(user, null, 2)}</pre>
    <div>Insert tweets</div>
  </>
  ); 
  }
  
  if (loading) {
    return <>Loading...</>
  } 

  
};

export default Home;
