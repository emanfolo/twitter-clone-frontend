import { useContext, useState} from 'react'
import { UserContext } from '../UserContext'
import Router, { useRouter } from "next/router";
import SearchBar from '../../components/explore/SearchBar';

import { Like, Hashtag, User, Profile, Tweet, TweetInfo, Retweet } from '../../types/Interfaces';
import Trending from '../../components/explore/Trending';


const Explore = () => {

  const [searchInput, setSearchInput] = useState(String)
  console.log(searchInput)

  const router = useRouter()


  const {user, setUser} = useContext(UserContext)

  const search = () => {
    if (searchInput.length > 0){
      router.push(`/search/${searchInput}`)
    } else {
      console.log('please enter correct params')
    }
    
  }

  return (
  <>
    <h1>Explore</h1>
    <SearchBar />
    <Trending />
  </>
  ); 
};

export default Explore;