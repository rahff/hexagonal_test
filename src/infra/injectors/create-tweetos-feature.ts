import { CreateTweetos } from "../../domain/use-cases/create-tweetos";
import { TweetosModel } from "../adapters/database/models/inMemory/tweetos.model";
import { Repository } from "../../domain/ports/out/repositories";



export function CreateTweetosFeature(tweetosRepository: Repository<TweetosModel>): CreateTweetos {
    return new CreateTweetos(tweetosRepository);
}