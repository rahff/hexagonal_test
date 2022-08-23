import { TweetDto } from "../driver/tweet.dto";
import { TweetosDto } from "../driver/tweetos.dtos";



export interface CreateTweetDao {
    findTweetos(_id: string): Promise<TweetosDto | null>
    saveTweet(data: TweetDto): Promise<TweetDto>;
}