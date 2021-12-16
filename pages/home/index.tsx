import { gql, useQuery } from "@apollo/client";

const AllTweetsQuery = gql`
  query {
    tweets {
      id
      contents
      createdAt
      image
      user {
        id
        username
        name
        profile {
          image
        }
      }
      hashtags {
        contents
        id
      }
    }
  }
`;

interface User {
  id: number;
  name: string;
  username: string;
  createdAt?: string;
  profile: Profile;
  tweets?: Array<Tweet>;
  followedBy?: Array<User>;
  following: Array<User>;
}

interface Profile {
  id?: number;
  image?: string;
  header_image?: string;
  bio?: string;
}

interface Hashtag {
  id: number;
  contents: string;
  tweets?: Tweet;
}

interface Tweet {
  contents?: string;
  createdAt: Date;
  hashtags: Array<Hashtag>;
  id: number;
  image?: string;
  user: User;
}

const Home = () => {
  const { data, error, loading } = useQuery(AllTweetsQuery);

  if (loading) return <p> Loading....</p>;

  if (error) return <p> Ooops, something went wrong {error.message} </p>;

  // console.log(data)

  const tweetFeed = data.tweets.map((tweet: Tweet) => (
    <>
      <div>{tweet.contents}</div>
      <div>
        <strong>{tweet.user.name}</strong> @{tweet.user.username}
      </div>
    </>
  ));

  return (
    <>
      <h1>This will be the home page with tweets</h1>
      <div>{tweetFeed}</div>
    </>
  );
};

export default Home;
