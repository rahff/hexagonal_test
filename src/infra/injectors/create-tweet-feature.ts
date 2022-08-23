import { CreateTweet } from "../../domain/modules/create-tweet.module";
import { CreateTweetDaoAdapter } from "../adapters/dao/create-tweet-dao-adapter";
import { tweetInMemory } from "../adapters/services/tweet-inMemory";
import { tweetMongoRepository } from "../adapters/services/tweet-repository";
import { tweetosInMemory } from "../adapters/services/tweetos-inMemory";
import { tweetosMongoRepository } from "../adapters/services/tweetos-repository";


import { DataSources } from "../database";


export function CreateTweetFeature(): CreateTweet {
   switch (process.env.DATASOURCE) {
      case DataSources.inMemory:
         const createTweetInMemoryDao = new CreateTweetDaoAdapter(tweetInMemory, tweetosInMemory)
         return new CreateTweet(createTweetInMemoryDao);
      case DataSources.mongoDb:
         const createTweetMongoDao = new CreateTweetDaoAdapter(tweetMongoRepository, tweetosMongoRepository)
         return new CreateTweet(createTweetMongoDao);
      default: throw new Error("No data source provided");
   }
}