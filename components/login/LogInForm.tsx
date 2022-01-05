import { useState } from "react";
import React, { useContext, useEffect} from 'react'
import { UserContext } from '../../pages/UserContext'
import Router, { useRouter } from "next/router";


const LogInForm = () => {

  const [modalOpen, setModalOpen] = useState(false)

  const toggleModalClass = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true)
  }

  const useModalClass = () => {
    return modalOpen ? "errorModalOpen" : "errorModalClosed"
  }

  const router = useRouter()
  const {user, setUser} = useContext(UserContext)

  const [emailInputState, setEmailInputState] = useState("");
  const [passwordInputState, setPasswordInputState] = useState("");

  const checkInputs = () => {
   if (!emailInputState.includes('@') || emailInputState.length < 5){
      // console.log('Invalid params, please enter in your full details')
      toggleModalClass()
      return false
    } else if (passwordInputState.length < 8){
      // console.log('Invalid params, please enter in your full details')
      toggleModalClass()
      return false
    } else {
      return true
    }
  }

  const apiURL = process.env.NODE_ENV == "production" ?  process.env.prodURL : process.env.devURL

  console.log(apiURL)


  const sendParams = async () => {
    if (checkInputs()) {
      const response = await fetch(`${apiURL}/user/login`, {
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
      router.push('/home')
    };
  }

  


  

  return (
    <>
      <div className="logInHeader">
      <h2> Welcome to Flitter </h2>
      </div>
      <div className="logInForm"> 
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendParams();
          }}
        > <div className="logInInputDiv">
            <input
              onChange={(e) => {
                setEmailInputState(e.target.value);
              }}
              value={emailInputState}
              placeholder={`Email`}
            />
          </div>
          
          <div className="logInInputDiv">
            <input
              onChange={(e) => {
                setPasswordInputState(e.target.value);
              }}
              value={passwordInputState}
              placeholder="Password"
              type={"password"}
            />
          </div>
          <div className="logInButton">
            <button type="submit">Log in</button>
          </div>
          
        </form>
      </div>

      <div id="myModal" className={useModalClass()}> 

      <div className="errorModal">
        <div className="errorModalContent">
          <h2>
            Error:
          </h2>
          <div>
            Your password or your email is incorrect please try again
          </div>
          <div className="okayContainer">
              <div onClick={(()=> {toggleModalClass()})} className="okay">Okay</div>
          </div>
          
        </div>
      </div>

    </div> 
    </>
  );
};

export default LogInForm;