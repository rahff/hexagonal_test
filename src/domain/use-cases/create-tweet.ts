import { CreateTweetRequestDto } from "../ports/dtos";
import { Repository } from "../ports/repositories";
import { Tweet } from "../models/tweet";
import { Tweetos } from "../models/tweetos";
import {v4 as uuid} from 'uuid';
import { Task } from "../ports/api";

export class CreateTweet implements Task<Tweet>{

    constructor(private tweetRepository: Repository<Tweet>,
                private tweetosRepository: Repository<Tweetos>){}

    async execute(data: CreateTweetRequestDto): Promise<Tweet> {
        const id = uuid();
        const tweetos = await this.tweetosRepository.findById(data.tweetosId);
        if(!tweetos) throw new Error("tweetos does not exist");
        const tweet = new Tweet(id, data.content, tweetos, 0, []);
        return await this.tweetRepository.create(tweet);
    }
}