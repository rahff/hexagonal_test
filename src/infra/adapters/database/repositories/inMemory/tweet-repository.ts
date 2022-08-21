
import { Repository } from "../../../../../domain/ports/out/repositories";
import { TweetModel } from "../../models/tweet.model";

import { AbstractInMemoryRepository } from "./abstract-inMemory-repository";



export class TweetRepository extends AbstractInMemoryRepository<TweetModel> implements Repository<TweetModel> {}
    
    
export const tweetRepositoryInMemoInstance = new TweetRepository()