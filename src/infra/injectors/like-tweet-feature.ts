import { DataSources } from "../database";
import { LikeTweet } from "../../domain/modules/like-tweet.module";
import { LikeTweetDaoAdapter } from "../adapters/dao/like-tweet-dao-adapter";
import { tweetInMemory } from "../adapters/services/tweet-inMemory";
import { tweetMongoRepository } from "../adapters/services/tweet-repository";



export function LikeTweetFeature(): LikeTweet {
    switch (process.env.DATASOURCE) {
      case DataSources.inMemory:
         const likeTweetInMemoryDao = new LikeTweetDaoAdapter(tweetInMemory);
         return new LikeTweet(likeTweetInMemoryDao);
      case DataSources.mongoDb:
         const likeTweetMongoDao = new LikeTweetDaoAdapter(tweetMongoRepository)
         return new LikeTweet(likeTweetMongoDao);
      default: throw new Error("No data source provided");
    }
 }