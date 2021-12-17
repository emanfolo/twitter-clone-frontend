import { useContext} from 'react'
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

const Profile = () => {


  // const tweetFeed = data.tweets.map((tweet: Tweet) => (
  //   <>
  //     <div>{tweet.contents}</div>
  //     <div>
  //       <strong>{tweet.user.name}</strong> @{tweet.user.username}
  //     </div>
  //   </>
  // ));

 const router = useRouter()


  const {user, setUser} = useContext(UserContext)

  return (
  <>
    <h1>This will be your profile</h1>
    <pre>{JSON.stringify(user, null, 2)}</pre>
    <div>Insert profile</div>
  </>
  ); 
};

export default Profile;