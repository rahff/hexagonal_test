import { CreateTweetRequestDto } from "../ports/in/dtos";
import { Tweet } from "../models/tweet";
import {v4 as uuid} from 'uuid';
import { Task } from "../ports/in/api";
import { fromModelToTweetos } from '../mappers/tweetos-mapper';
import { Repository } from "../ports/out/repositories";
import { fromModelToTweet } from "../mappers/tweet-mapper";
import { TweetModel } from "../../infra/adapters/database/models/tweet.model";
import { TweetosModel } from "../../infra/adapters/database/models/tweetos.model";



export class CreateTweet implements Task<Tweet>{

    constructor(private tweetRepository: Repository<TweetModel>,
                private tweetosRepository: Repository<TweetosModel>){}

    async execute(data: CreateTweetRequestDto): Promise<Tweet> {
        const id = uuid();
        try {
            const tweetosModel = await this.tweetosRepository.findOneBy({_id: data.tweetosId});
            if(!tweetosModel) throw new Error("tweetos does not exist");
            const tweetos = fromModelToTweetos(tweetosModel);
            const tweet = new Tweet(id, data.content, tweetos, 0, []);
            const tweetModel = await this.tweetRepository.save({content: tweet.content, _id: tweet._id, comments: tweet.comments, likes: tweet.likes, tweetos: {...tweet.tweetos} });
            if(!tweetModel) throw new Error('tweet storage failed');
            return fromModelToTweet(tweetModel);
            
        } catch (error) {
            console.log(error);
            throw error
            
        }
    }
}