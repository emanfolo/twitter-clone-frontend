import { gql, useQuery } from '@apollo/client'

const AllTweetsQuery = gql `
  query{
    tweets{
    id
    contents
    createdAt
    image
    user {
      id
      username
      name
      profile{
        image
      }
    }
    hashtags {
      contents
    }
   }

  }
  
`

const Home = () => {

  const {data, error, loading} = useQuery(AllTweetsQuery);

  if(loading) return <p> Loading....</p>

  if(error) return <p> Ooops, something went wrong {error.message} </p>

  console.log(data)

  const tweetFeed = data.tweets.map((val) => (
     <> 
      <div>
          {val.contents}
      </div>
      <div>
          <strong>{val.user.name}</strong> @{val.user.username}
      </div>  
    </>
  ))
  
  


  return <> 
  <h1>
    This will be the home page with tweets 
  </h1>
  <body>
    {tweetFeed} 
  </body>
  </>
}

export default Home