import React, { useContext} from 'react'
import { UserContext } from '../UserContext'
import Router, { useRouter } from "next/router";


const CreateUser = () => {

  const router = useRouter()

  const {user, setUser} = useContext(UserContext)

  const logOut = async () => {
    if (user) {
      const response = await fetch('http://localhost:4000/user/logout', {
        method: 'DELETE',
        headers : { 
        'Content-Type': 'application/json'
       },
        body: JSON.stringify( {
          token: user.refreshToken
       })
      })
      setUser(null)
      router.push('/user/login')
  };
}

// testingauth@gmail.com
// password

  return (
    <>
      Log in page
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div>
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

export default CreateUser;