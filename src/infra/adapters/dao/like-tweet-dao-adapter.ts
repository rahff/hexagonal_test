import { TweetDto } from "src/domain/modules/ports/driver/tweet.dto";
import { MongoInterface } from "src/infra/database";
import { LikeTweetDao } from "../../../domain/modules/ports/driven/like-tweet-dao";

export class LikeTweetDaoAdapter implements LikeTweetDao {

    constructor(private tweetRepository: MongoInterface<TweetDto>){}

    async findTweetById(_id: string): Promise<TweetDto | null> {
        const foundedTweet = await this.tweetRepository.findOne({_id});
        if(!foundedTweet) return null;
        return foundedTweet;
    }

    async addLikeOnTweet(_id: string): Promise<TweetDto> {
        const updateResult = await this.tweetRepository.updateOne({_id}, {$inc: {likes: 1}});
        const likedtweet = await this.tweetRepository.findOne({_id});
        if(!likedtweet) throw new Error('update failed');
        return likedtweet;
    }

}