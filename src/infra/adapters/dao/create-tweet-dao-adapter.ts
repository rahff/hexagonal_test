import { Tweetos } from "../../../core/models/tweetos";
import { CreateTweetDao } from "../../../core/ports/driven/create-tweet-dao";
import { TweetDto } from "../../../core/ports/driver/tweet.dto";
import { MongoInterface } from "../../database";
import { TweetosDto } from "src/core/ports/driver/tweetos.dtos";



export class CreateTweetDaoAdapter implements CreateTweetDao {

    constructor(private tweetRepository: MongoInterface<TweetDto>, private tweetosRepository: MongoInterface<TweetosDto> ){}

    async findTweetos(_id: string): Promise<TweetosDto | null> {
        const foundedTweetos = await this.tweetosRepository.findOne({_id});
        if(!foundedTweetos) return null;
        return foundedTweetos;
    }

    async saveTweet(data: TweetDto): Promise<TweetDto> {
        const savedResult = await this.tweetRepository.insertOne(data);
        const savedTweet = await this.tweetRepository.findOne({_id: savedResult.insertedId});
        if(!savedTweet) throw new Error("insert failed");
        return savedTweet;
    }

}

