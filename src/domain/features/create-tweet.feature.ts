import { Tweet } from "../models/tweet";
import { generateId } from '../utils';
import { CreateTweetTask } from "../ports/driver/api";
import { CreateTweetRequestDto, TweetDto } from "../ports/driver/tweet.dto";
import { CreateTweetDao } from "../ports/driven/create-tweet-dao";



export class CreateTweet implements CreateTweetTask {

    constructor(private repositoryAdapter : CreateTweetDao){}

    async execute(data: CreateTweetRequestDto): Promise<TweetDto> {
        const id = generateId();
        try {
            const foundedtweetos = await this.repositoryAdapter.findTweetos(data.tweetosId);
            if(!foundedtweetos) throw new Error("tweetos does not exist");
            const tweet = new Tweet(id, data.content, foundedtweetos, 0);
            const savedTweet = await this.repositoryAdapter.saveTweet(tweet.getTweetDto());
            if(!savedTweet) throw new Error('tweet storage failed');
            return tweet.getTweetDto();
        } catch (error) {
            throw error;
        }
    }
}