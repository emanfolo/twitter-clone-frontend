import { useContext, useState, useEffect} from 'react'
import { UserContext } from '../UserContext'
import Router, { useRouter } from "next/router";
import FeedContainer from '../../components/home/FeedContainer';
import { parseCookies } from '../../helpers';
import Cookies from 'js-cookie';
import { NextPage } from 'next'


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




  const {user, setUser} = useContext(UserContext)

  const [tweetFeed, setTweetFeed] = useState<Array<Tweet>>([])
  const [loading, setLoading] = useState<Boolean>(false)

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
    setTweetFeed(json);
    setLoading(false);
  }


  //Eventually I want to block users from ever going onto this page

  if(!user){
    return <> You have to be logged in</>
  }

  if(user){

     useEffect(() => {
    getTweetFeed(user.accessToken);
    }, [tweetFeed])

    return (
  <>
    <h2>Home</h2>
    <div>
    <div>
      <FeedContainer {...tweetFeed}/>
    </div>
    </div>
  </>
  ); 
  }
  
  if (loading) {
    return <>Loading...</>
  } 

//  Home.getInitialProps = ({req}: any) => {
//     const cookies = parseCookies(req);
//     cookies.user
//   }

//   return {
//     initialUserValue: cookies.user
//   }

  
};

export default Home;
