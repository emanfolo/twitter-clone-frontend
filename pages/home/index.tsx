


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

  // const tweetFeed = data.tweets.map((tweet: Tweet) => (
  //   <>
  //     <div>{tweet.contents}</div>
  //     <div>
  //       <strong>{tweet.user.name}</strong> @{tweet.user.username}
  //     </div>
  //   </>
  // ));

  return (
    <>
      <h1>This will be the home page with tweets</h1>
      <div>Insert tweets</div>
    </>
  );
};

export default Home;
