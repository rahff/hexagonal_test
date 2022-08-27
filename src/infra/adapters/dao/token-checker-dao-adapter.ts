import { TokenCheckDao } from "../../../infra/interfaces";
import { TweetosDto } from "../../../core/ports/driver/tweetos.dtos";
import { MongoInterface } from "../../../infra/database";


export class TokenCheckerDaoAdapter implements TokenCheckDao {

    constructor(private tweetosRepository:  MongoInterface<TweetosDto>){
        
    }
    async getTweetosById(_id: string): Promise<TweetosDto | null> {
        const foundedTweetos = await this.tweetosRepository.findOne({_id});
        if(!foundedTweetos) return null;
        return foundedTweetos;
    }

}