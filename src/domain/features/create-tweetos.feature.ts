import { Tweetos } from "../models/tweetos";
import { generateId } from "../utils";
import { CreateTweetosTask } from "../ports/driver/api";
import { CreateTweetosRequestDto, TweetosDto } from "../ports/driver/tweetos.dtos";
import { CreateTweetosDao } from "../ports/driven/create-tweetos-dao";
import { CreateTweetosProducerEvent } from "../ports/driven/handlers/create-tweetos-handler";



export class CreateTweetos implements CreateTweetosTask {

    constructor(private tweetosRepository: CreateTweetosDao, private eventEmitter: CreateTweetosProducerEvent){}

    async execute(data: CreateTweetosRequestDto): Promise<TweetosDto> {
        const id = generateId();
        try {
            const tweetosWithSameEmail = await this.tweetosRepository.findTweetosByEmail(data.email);
            if(tweetosWithSameEmail) throw new Error("email already exist");
            const tweetos = new Tweetos(id, data.email, data.username, data.avatar, []);
            const savedTweetos = await this.tweetosRepository.saveTweetos(tweetos.getTweetosDto());
            this.eventEmitter.sendToQueue(savedTweetos);
            return savedTweetos;
        } catch (error) {
            throw error;
        }
    }
}