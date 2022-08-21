import { LikeTweet } from "../../domain/use-cases/like-tweet";
import { tweetRepositoryInMemoInstance } from "../adapters/database/repositories/inMemory/tweet-repository";
import { tweetMongoRepository } from "../adapters/database/repositories/prod/tweetrepository";



export function CreateLikeTweetFeature(): LikeTweet {
    switch (process.env.DATASOURCE) {
       case "inMemory":
          return new LikeTweet(tweetRepositoryInMemoInstance);
       case "mongoDB":
          return new LikeTweet(tweetMongoRepository);
       default:
          return new LikeTweet(tweetMongoRepository);
    }
 }