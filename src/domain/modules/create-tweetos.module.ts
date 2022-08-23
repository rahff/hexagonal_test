import { Tweetos } from "../models/tweetos";
import { generateId } from "../utils";
import { CreateTweetosTask } from "./ports/driver/api";
import { CreateTweetosRequestDto, TweetosDto } from "./ports/driver/tweetos.dtos";
import { CreateTweetosDao } from "./ports/driven/create-tweetos-dao";



export class CreateTweetos implements CreateTweetosTask {

    constructor(private tweetosRepository: CreateTweetosDao){}

    async execute(data: CreateTweetosRequestDto): Promise<TweetosDto> {
        const id = generateId();
        try {
            const tweetosWithSameEmail = await this.tweetosRepository.findTweetosByEmail(data.email);
            if(tweetosWithSameEmail) throw new Error("email already exist");
            const tweetos = new Tweetos(id, data.email, data.username, data.avatar, []);
            const savedTweetos =  await this.tweetosRepository.saveTweetos(tweetos.getTweetosDto());
            return tweetos.getTweetosDto();
        } catch (error) {
            throw error;
        }
    }
}