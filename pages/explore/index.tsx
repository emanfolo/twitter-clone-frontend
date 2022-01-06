import { useContext, useState} from 'react'
import { UserContext } from '../../context/UserContext'
import Router, { useRouter } from "next/router";
import AccountsToFollow from '../../components/explore/AccountsToFollow';


const Explore = () => {

  return (
  <>
    <AccountsToFollow />
  </>
  ); 
};

export default Explore;