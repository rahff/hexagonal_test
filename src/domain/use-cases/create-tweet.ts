import { CreateTweetRequestDto } from "../ports/in/dtos";
import { Tweet } from "../models/tweet";
import {v4 as uuid} from 'uuid';
import { Task } from "../ports/in/api";
import { TweetosModel } from "../../infra/adapters/database/models/inMemory/tweetos.model";
import { fromModelToTweetos } from '../mappers/tweetos-mapper';
import { Repository } from "../ports/out/repositories";
import { TweetModel } from "../../infra/adapters/database/models/inMemory/tweet.model";
import { fromModelToTweet } from "../mappers/tweet-mapper";



export class CreateTweet implements Task<Tweet>{

    constructor(private tweetRepository: Repository<TweetModel>,
                private tweetosRepository: Repository<TweetosModel>){}

    async execute(data: CreateTweetRequestDto): Promise<Tweet> {
        const id = uuid();
        const tweetosModel = await this.tweetosRepository.findById(data.tweetosId);
        if(!tweetosModel) throw new Error("tweetos does not exist");
        const tweetos = fromModelToTweetos(tweetosModel);
        const tweet = new Tweet(id, data.content, tweetos, 0, []);
        const tweetModel = await this.tweetRepository.create({content: tweet.content, id: tweet.id, comments: tweet.comments, likes: tweet.likes, tweetos: tweet.tweetos });
        if(!tweetModel) throw new Error('tweet storage failed');
        return fromModelToTweet(tweetModel);
    }
}