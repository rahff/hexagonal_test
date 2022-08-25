import { LikeTweetTask } from "../ports/driver/api";
import { LikeTweetRequestDto, TweetDto } from "../ports/driver/tweet.dto";
import { LikeTweetDao } from "../ports/driven/like-tweet-dao";



export class LikeTweet implements LikeTweetTask {
    
    constructor(private tweetRepository: LikeTweetDao){}

    async execute(data: LikeTweetRequestDto): Promise<TweetDto> {
        try {
            const foundedTweet = await this.tweetRepository.findTweetById(data.tweetId);
            if(!foundedTweet) throw new Error("this tweet does not exist");
            const likedTweet = await this.tweetRepository.addLikeOnTweet(foundedTweet._id);
            return likedTweet;
        } catch (error) {
            throw error;
        }
    }

}