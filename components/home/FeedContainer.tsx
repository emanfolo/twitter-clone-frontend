import TweetCard from './TweetCard'

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

const FeedContainer = (props: Array<Tweet>) => {

  const tweetFeed = props

  const tweetsArray = Object.values(tweetFeed)

  const tweetsDisplay = tweetsArray.map((data) => {

    const key = `tweet-${data.id}`
    return (
    <>
      <div>
        <TweetCard key={key} tweetInfo={data} />
      </div>
    </>
    )
  });

  return <>
  <div>
    Tweet feed
  </div>
  <div>
    {tweetsDisplay}
  </div>
  </>
}

export default FeedContainer