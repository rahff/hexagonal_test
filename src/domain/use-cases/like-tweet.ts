import { Tweet } from "../../../src/domain/models/tweet";
import { Task } from "../../../src/domain/ports/in/api";
import { TweetModel } from "../../infra/adapters/database/models/inMemory/tweet.model";
import { fromModelToTweet } from "../mappers/tweet-mapper";
import { LikeTweetRequestDto } from "../ports/in/dtos";
import { Repository } from "../ports/out/repositories";



export class LikeTweet implements Task<Tweet> {
    
    constructor(private tweetRepository: Repository<TweetModel>){}

    async execute(data: LikeTweetRequestDto): Promise<Tweet> {
        const likedTweet =  await this.tweetRepository.findById(data.tweetId);
        if(!likedTweet) throw new Error("this tweet does not exist");
        const updatedTweet = await this.tweetRepository.updateOne(data.tweetId, {likes: ++likedTweet.likes});
        return fromModelToTweet(updatedTweet as TweetModel);
    }

}