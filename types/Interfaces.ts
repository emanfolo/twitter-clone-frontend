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

export interface FeedItem {
  id: number
  user: User
  userID: number
  type: String
  tweetID?: String 
  tweet?: Tweet 
  retweetID?: number
  retweet?: Retweet 
  createdAt: Date 
}

export interface Mention {
  id: number
  username: String 
  user: User 
  tweets: Array<Tweet>
  notification?: Notification
}

export interface Notification {
  id: number
  createdAt: Date
  recipientID: number
  recipient: User
  type: String
  mentionID?: number
  mention?: Mention
  likeID?: number
  like?: Like
  retweetID?: number
  retweet?: Retweet
  replyID?: number
  reply?: Tweet
}