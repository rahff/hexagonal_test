import { TweetDto } from "../driver/tweet.dto";

export interface GetTweetListDao {
    getTweetList(forWhomIs: {}): Promise<TweetDto[]>
}