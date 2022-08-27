import { GetTweetListDao } from "../../ports/driven/get-twwet-list-dao";
import { GetTweetListQuery } from "../../ports/driver/api";
import { TweetDto } from "../../ports/driver/tweet.dto";



export class GetTweetList implements GetTweetListQuery {

    constructor(private getTweetListDao: GetTweetListDao){}

    async get(forWhomIs: {}): Promise<TweetDto[]> {
        try {
            const tweetList = await this.getTweetListDao.getTweetList(forWhomIs);
            return tweetList;
        } catch (error) {
            throw error;
        }
    }
}