import { gql, useMutation } from '@apollo/client';

const REGISTER_USER = gql`
    mutation Mutation($data: UserCreateInput!) {
  createUser(data: $data) {
    id
    email
    username
    createdAt
    profile {
      image
    }
    followedBy {
      id
    }
    following {
      id
    }
  }
}

`

// {
//   "data": {
//     "email": "test@gmail.com",
//     "name": "testing",
//     "username": "testguy",
//     "profile": {
//       "create": {
//         "image": null,
//         "header_image": null,
//         "bio": null
//       }
//     },
//     "password": "password"
//   }
// }


const CreateUser = () => {

  let email: any;
  let username: any;
  let name: any;
  let password: any;
  const [registerMutateFunction, { data, loading, error }] = useMutation(REGISTER_USER)

  if (loading) return 'Loading...';

  if (error) return `Error! ${error.message}`;

  if(data) return <> {data.id} {data.username} {data.name} </>

  return (
  <> 
  Sign up page 
  <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          registerMutateFunction({ variables: { 
            data: {
                    "email": email.value,
                    "name": username.value,
                    "username": name.value,
                    "profile": {
                      "create": {
                        "image": null,
                        "header_image": null,
                        "bio": null
                      }
                    },
                    "password": password.value
                  }
                } 
              });
          
        }}
      >
        <input
          ref={node => {
            email = node;
          }}
        /> Email
        <input
          ref={node => {
            username = node;
          }}
        /> Username
        <input
          ref={node => {
            password = node;
          }}
        /> Password
        <input
          ref={node => {
            name = node;
          }}
        /> Name
        <button type="submit">Register</button>
      </form>
    </div>

  </>)
}

export default CreateUser