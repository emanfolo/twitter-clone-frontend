export interface User {
  id: number;
  name: string;
  username: string;
  createdAt?: string;
  profile: Profile;
  followedBy?: Array<User>;
  following: Array<User>;
  tweets: Array <Tweet>;
  retweets: Array <Retweet>;
  likes: Array <Like>;
}

export interface Profile {
  id?: number;
  image?: string;
  header_image?: string;
  bio?: string;
}

export interface Hashtag {
  id: number;
  contents: string;
}

export interface TweetInfo {
  tweetInfo: {
  contents?: string;
  createdAt: Date;
  hashtags: Array<Hashtag>;
  retweets: Array<Retweet>;
  likes: Array<Like>;
  id: number;
  image?: string;
  user: User;
  }
}

export interface Tweet {
  contents?: string;
  createdAt: Date;
  hashtags: Array<Hashtag>;
  id: number;
  image?: string;
  user: User;
  likes: Array<Like>
  retweets: Array<Retweet>
}

export interface Retweet {
  id: number
  userID: number
  user: User
  tweetID: number
  tweet: Tweet
}

export interface Like {
  id: number
  userID: number
  user: User
  tweetID: number
  tweet: Tweet
}