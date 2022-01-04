import { useState } from "react";
import { useContext} from 'react'
import { UserContext } from '../UserContext'
import { useRouter } from "next/router";


const CreateUser = () => {

  const router = useRouter()

  const {user, setUser} = useContext(UserContext)


  const [emailInputState, setEmailInputState] = useState("");
  const [usernameInputState, setUsernameInputState] = useState("");
  const [nameInputState, setNameInputState] = useState("");
  const [passwordInputState, setPasswordInputState] = useState("");

  const checkInputs = () => {
   if (!emailInputState.includes('@') || emailInputState.length < 5){
      console.log('Invalid params, please enter in your full details')
      return false
    } else if (passwordInputState.length < 8){
      console.log('Invalid params, please enter in your full details')
      return false
    } else if (usernameInputState.length < 4) {
      console.log('Invalid params, please enter in your full details')
      return false
    } else if (nameInputState.length < 1){
      console.log('Invalid params, please enter in your full details')
      return false
    } else {
      return true
    }
  }

  const sendParams = async () => {
    if (checkInputs()) {
      const response = await fetch('http://localhost:4000/user/register', {
        method: 'POST',
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
        body: JSON.stringify( {
          email: emailInputState,
          password: passwordInputState,
          name: nameInputState,
          username: usernameInputState
       })
      })
      const result = await response.json()
      setUser(result)
      router.push('/user/createprofile')
  };
}

// testingauth@gmail.com
// password

  return (
    <>
      Sign up page
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
            Username:
            <input
              onChange={(e) => {
                setUsernameInputState(e.target.value);
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
          <label>
            Name:
            <input
              onChange={(e) => {
                setNameInputState(e.target.value);
              }}
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
