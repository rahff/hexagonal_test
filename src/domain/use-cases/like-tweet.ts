import { TweetModel } from "../../infra/adapters/database/models/tweet.model";
import { Tweet } from "../../../src/domain/models/tweet";
import { Task } from "../../../src/domain/ports/in/api";
import { fromModelToTweet } from "../mappers/tweet-mapper";
import { LikeTweetRequestDto } from "../ports/in/dtos";
import { Repository } from "../ports/out/repositories";



export class LikeTweet implements Task<Tweet> {
    
    constructor(private tweetRepository: Repository<TweetModel>){}

    async execute(data: LikeTweetRequestDto): Promise<Tweet> {
        try {
            const likedTweet =  await this.tweetRepository.findOneBy({_id: data.tweetId});
            if(!likedTweet) throw new Error("this tweet does not exist");
            const updatedTweet = await this.tweetRepository.update({_id: data.tweetId}, {likes: ++likedTweet.likes});
            return fromModelToTweet(updatedTweet as TweetModel);
        } catch (error) {
            throw error
        }
    }

}