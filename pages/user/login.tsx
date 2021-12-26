import { useState } from "react";
import React, { useContext, useEffect} from 'react'
import { UserContext } from '../UserContext'
import Router, { useRouter } from "next/router";
import { useCookies } from "react-cookie";
// import { useLocalStorage } from "../../hooks/useLocalStorage";


const LogIn = () => {

  const router = useRouter()
  const {user, setUser} = useContext(UserContext)

  // const [userStorage, setUserStorage] = useLocalStorage("user", "");


  // const [user, setUser] = useCookies(["user"])

  // useEffect(() => {
  //   // storing input name
  //   localStorage.setItem(key, JSON.stringify(user));
  // }, [key, user]);

  const [emailInputState, setEmailInputState] = useState("admin@gmail.com");
  const [passwordInputState, setPasswordInputState] = useState("adminPassword");

  const checkInputs = () => {
   if (!emailInputState.includes('@') || emailInputState.length < 5){
      console.log('Invalid params, please enter in your full details')
      return false
    } else if (passwordInputState.length < 8){
      console.log('Invalid params, please enter in your full details')
      return false
    } else {
      return true
    }
  }

  const sendParams = async () => {
    if (checkInputs()) {
      const response = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
        body: JSON.stringify( {
          email: emailInputState,
          password: passwordInputState,
       })
      })
      const result = await response.json()
      localStorage.setItem('user', JSON.stringify(result))
      setUser(result)
      // setUser("user", JSON.stringify(result), {
      //   path:"/",
      //   maxAge: 3600,
      //   sameSite: true
      // })
      router.push('/home')
    };
  }

  


  

  return (
    <>
      Log in page
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendParams();
          }}
        >
          <label>
            Email:
            <input
              onChange={(e) => {
                setEmailInputState(e.target.value);
              }}
              placeholder={emailInputState}
            />
          </label>
          <label>
            Password:
            <input
              onChange={(e) => {
                setPasswordInputState(e.target.value);
              }}
              placeholder={passwordInputState}
            />
          </label>
          <button type="submit">Log in</button>
        </form>
      </div>
    </>
  );
};

export default LogIn;