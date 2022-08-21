import { CreateTweetosRequestDto } from "../ports/in/dtos";
import { Tweetos } from "../models/tweetos";
import {v4 as uuid} from 'uuid';
import { Task } from "../ports/in/api";

import { Repository } from "../ports/out/repositories";
import { TweetosModel } from "../../infra/adapters/database/models/tweetos.model";



export class CreateTweetos implements Task<Tweetos>{

    constructor(private tweetosRepository: Repository<TweetosModel>){}

    async execute(data: CreateTweetosRequestDto): Promise<Tweetos> {
        const id = uuid();
        try {
            const tweetosWithSameEmail = await this.tweetosRepository.findOne({email: data.email});
            if(tweetosWithSameEmail) throw new Error("email already exist");
            const tweetos = new Tweetos(id, data.email, data.username, data.avatar, []);
            await this.tweetosRepository.save({username: tweetos.username, avatar: tweetos.avatar, email: tweetos.email, _id: tweetos._id, followers: tweetos.followers});
            return tweetos;
        } catch (error) {
            throw error
        }
    }
}