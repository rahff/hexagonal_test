import { TweetosDto } from "../../../core/ports/driver/tweetos.dtos";
import { MongoInterface } from "../../../infra/database";
import { CreateTweetosDao } from "../../../core/ports/driven/create-tweetos-dao";

export class CreatTweetosDaoAdapter implements CreateTweetosDao {

    constructor(private tweetosRepository: MongoInterface<TweetosDto>){}

    async saveTweetos(data: TweetosDto): Promise<TweetosDto> {
        const savedResult = await this.tweetosRepository.insertOne(data);
        const savedTweetos = await this.tweetosRepository.findOne({_id: savedResult.insertedId});
        if(!savedTweetos) throw new Error('insert failed');
        return savedTweetos;
    }

    async findTweetosByEmail(email: string): Promise<TweetosDto | null> {
        const foundedTweetos = await this.tweetosRepository.findOne({email});
        if(!foundedTweetos) return null;
        return foundedTweetos;
    }
}
