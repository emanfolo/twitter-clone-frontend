import { useState } from "react";
import React, { useContext} from 'react'
import { UserContext } from '../UserContext'
import Router, { useRouter } from "next/router";


const CreateUser = () => {

  const router = useRouter()

  const {user, setUser} = useContext(UserContext)

  const [emailInputState, setEmailInputState] = useState("");
  const [passwordInputState, setPasswordInputState] = useState("");

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
      setUser(result)
      console.log(result)
      router.push('/home')
    };
  }

// testingauth@gmail.com
// password


  return (
    <>
      Log in page
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div>
          testingauth@gmail.com  
          password
      </div>
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
            />
          </label>
          <label>
            Password:
            <input
              onChange={(e) => {
                setPasswordInputState(e.target.value);
              }}
            />
          </label>
          <button type="submit">Log in</button>
        </form>
      </div>
    </>
  );
};

export default CreateUser;