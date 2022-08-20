
import { Repository } from "../../../../../domain/ports/out/repositories";
import { TweetModel } from "../../models/inMemory/tweet.model";

import { AbstractRepository } from "./abstract-repository";



export class TweetRepository extends AbstractRepository<TweetModel> implements Repository<TweetModel> {}
    
    
export const tweetRepositoryInMemoInstance = new TweetRepository()