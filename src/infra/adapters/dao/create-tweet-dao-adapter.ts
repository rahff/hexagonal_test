import { Tweetos } from "../../../domain/models/tweetos";
import { CreateTweetDao } from "../../../domain/modules/ports/driven/create-tweet-dao";
import { TweetDto } from "../../../domain/modules/ports/driver/tweet.dto";
import { MongoInterface } from "../../database";
import { TweetosDto } from "src/domain/modules/ports/driver/tweetos.dtos";



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

