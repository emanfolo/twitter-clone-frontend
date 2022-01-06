import React, { useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import Router, { useRouter } from "next/router";


const LogOut = () => {

  const apiURL = process.env.NODE_ENV == "production" ?  process.env.prodURL : process.env.devURL

  const router = useRouter()

  const {user, setUser} = useContext(UserContext)

  const logOut = async () => {
    if (user) {
      const response = await fetch(`${apiURL}/user/logout`, {
        method: 'DELETE',
        headers : { 
        'Content-Type': 'application/json'
       },
        body: JSON.stringify( {
          token: user.refreshToken
       })
      })
      setUser("")
      router.push('/user/login')
  };
}

  return (
    <>
      <div className='logOut' >
        <h2>Are you sure you want to log out</h2>
      
      
        <button onClick = {() => {
          logOut()
        }}>
          
            Log out
        </button>
      </div>
    </>
  );
};

export default LogOut;