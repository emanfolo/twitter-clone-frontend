// import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
// import * as dotenv from 'dotenv'
// // dotenv.config({path: '../../.env'})

// dotenv.config()

// import bcryptjs from "bcryptjs";

// const REGISTER_USER = gql`
//   mutation Mutation($data: UserCreateInput!) {
//     createUser(data: $data) {
//       id
//       email
//       username
//       createdAt
//       profile {
//         image
//       }
//       followedBy {
//         id
//       }
//       following {
//         id
//       }
//     }
//   }
// `;

const CreateUser = () => {
  const [emailInputState, setEmailInputState] = useState("");
  const [usernameInputState, setUsernameInputState] = useState("");
  const [nameInputState, setNameInputState] = useState("");
  const [passwordInputState, setPasswordInputState] = useState("");

  // const [registerMutateFunction, { data, loading, error }] =
  //   useMutation(REGISTER_USER);

  // const encrypt = (password: string) => {
  //   let hashedPassword = bcryptjs.hash(password, 12);
  //   return hashedPassword;
  // };

  // const sendParams = async () => {
  //   let dbPass = null;

  //   dbPass = await encrypt(passwordInputState);

  //   console.log(dbPass);

  //   if (dbPass !== null) {
  //     registerMutateFunction({
  //       variables: {
  //         data: {
  //           email: emailInputState,
  //           name: nameInputState,
  //           username: usernameInputState,
  //           profile: {
  //             create: {
  //               image: null,
  //               header_image: null,
  //               bio: null,
  //             },
  //           },
  //           password: dbPass,
  //         },
  //       },
  //     });
  //   }
  // };

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
      console.log(result)
  };
}

  // if (loading) return 'Loading...';

  // if (error) return `Error! ${error.message}`;

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
