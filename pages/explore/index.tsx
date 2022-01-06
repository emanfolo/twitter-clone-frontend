import { useContext, useState} from 'react'
import { UserContext } from '../UserContext'
import Router, { useRouter } from "next/router";
import AccountsToFollow from '../../components/explore/AccountsToFollow';


const Explore = () => {

  const [searchInput, setSearchInput] = useState(String)

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
    <AccountsToFollow />
  </>
  ); 
};

export default Explore;