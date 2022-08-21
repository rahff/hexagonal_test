import { CreateTweetos } from "../../domain/use-cases/create-tweetos";
import { tweetosRepositoryInMemoInstance } from "../adapters/database/repositories/inMemory/tweetos-repository";
import { tweetosMongoRepository } from "../adapters/database/repositories/prod/tweetos-repository";



export function CreateTweetosFeature(): CreateTweetos {
    switch (process.env.DATASOURCE) {
       case "inMemory":
          return new CreateTweetos(tweetosRepositoryInMemoInstance)
       case "mongoDB":
          return new CreateTweetos(tweetosMongoRepository)
       default:
          return new CreateTweetos(tweetosMongoRepository)
    }
 }
    
