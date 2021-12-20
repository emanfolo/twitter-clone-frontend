import { useContext, useState, useEffect} from 'react'
import { UserContext } from '../../UserContext'
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

  const {user, setUser} = useContext(UserContext)


  const [profile, setProfile] = useState<User>()
  const [loading, setLoading] = useState(Boolean)

 const getProfile = async (authToken: string) => {
   setLoading(true)
    const url = 'http://localhost:4000/profile'
    const res = await fetch(url, { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      });
    const json = await res.json();
    console.log(json)
    setProfile(json);
    setLoading(false);
}

  if(user){

     useEffect(() => {
    getProfile(user.accessToken);
    }, [])
  }

 const router = useRouter()

  return (
  <>
    <h1>This will be your profile</h1>
    <pre>{JSON.stringify(user, null, 2)}</pre>
    <div>Insert profile</div>
  </>
  ); 
};

export default Profile;