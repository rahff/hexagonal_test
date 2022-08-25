import { TweetDto } from "../driver/tweet.dto";

export interface LikeTweetDao {
    findTweetById(_id: string): Promise<TweetDto | null>;
    addLikeOnTweet(_id: string): Promise<TweetDto>
}