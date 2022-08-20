import { CreateTweetosRequestDto } from "../ports/in/dtos";
import { Tweetos } from "../models/tweetos";
import {v4 as uuid} from 'uuid';
import { Task } from "../ports/in/api";
import { TweetosModel } from "../../infra/adapters/database/models/inMemory/tweetos.model"
import { Repository } from "../ports/out/repositories";



export class CreateTweetos implements Task<Tweetos>{

    constructor(private tweetosRepository: Repository<TweetosModel>){}

    async execute(data: CreateTweetosRequestDto): Promise<Tweetos> {
        const id = uuid();
        const tweetosWithSameEmail = await this.tweetosRepository.findOne({email: data.email});
        if(tweetosWithSameEmail) throw new Error("email already exist");
        const tweetos = new Tweetos(id, data.email, data.username, data.avatar, []);
        await this.tweetosRepository.create({username: tweetos.username, avatar: tweetos.avatar, email: tweetos.email, id: tweetos.id, followers: tweetos.followers});
        return tweetos;
    }
}