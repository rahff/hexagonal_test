import { CreateTweet } from "../../domain/use-cases/create-tweet";
import { tweetRepositoryInMemoInstance } from "../adapters/database/repositories/inMemory/tweet-repository";
import { tweetosRepositoryInMemoInstance } from "../adapters/database/repositories/inMemory/tweetos-repository";
import { tweetosMongoRepository } from "../adapters/database/repositories/prod/tweetos-repository";
import { tweetMongoRepository } from "../adapters/database/repositories/prod/tweetrepository";


export function CreateTweetFeature(): CreateTweet {
   switch (process.env.DATASOURCE) {
      case "inMemory":
         return new CreateTweet(tweetRepositoryInMemoInstance, tweetosRepositoryInMemoInstance)
      case "mongoDB":
         return new CreateTweet(tweetMongoRepository, tweetosMongoRepository)
      default:
         return new CreateTweet(tweetMongoRepository, tweetosMongoRepository)
   }
}