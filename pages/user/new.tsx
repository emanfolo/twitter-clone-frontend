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
  const [errorMessage, setErrorMessage] = useState("")

  const [modalOpen, setModalOpen] = useState(false)

  const toggleModalClass = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true)
  }

  const useModalClass = () => {
    return modalOpen ? "errorModalOpen" : "errorModalClosed"
  }

  const checkInputs = () => {
   if (!emailInputState.includes('@') || emailInputState.length < 5){
      setErrorMessage('Invalid params, please enter in a valid email address')
      toggleModalClass()
      return false
    } else if (passwordInputState.length < 8){
      setErrorMessage('Invalid params, your password must be at least 8 characters')
      toggleModalClass()
      return false
    } else if (usernameInputState.length < 4) {
      setErrorMessage('Invalid params, your username must be at least 4 characters')
      toggleModalClass()
      return false
    } else if (nameInputState.length < 1){
      setErrorMessage('Invalid params, please enter in a valid name')
      toggleModalClass()
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


  return (
    <>
      <div className="logInHeader">
        <h2>Please enter in your details below</h2>
      </div>
      
      <div className="logInForm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendParams();
          }}
        >
          <div className="logInInputDiv"> 
            <input
              onChange={(e) => {
                setEmailInputState(e.target.value);
              }}
              value={emailInputState}
              placeholder="Email"
            />
          </div>
          <div className="logInInputDiv" >
            <input
              onChange={(e) => {
                setPasswordInputState(e.target.value);
              }}
              value={passwordInputState}
              placeholder="Password"
              type={"password"}
            />
          </div>
          <div className="logInInputDiv" >
            <input
              onChange={(e) => {
                setUsernameInputState(e.target.value);
              }}
              value={usernameInputState}
              placeholder="Username"
            />
          </div>
          <div className="logInInputDiv" >
            <input
              onChange={(e) => {
                setNameInputState(e.target.value);
              }}
              value={nameInputState}
              placeholder="Name"
            />
          </div>
          <div className="logInButton" >
            <button type="submit">Register</button>
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
            {errorMessage}
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

export default CreateUser;
