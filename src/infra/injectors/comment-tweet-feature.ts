import { CommentTweet } from "../../domain/modules/comment-tweet.module";
import { CommentTweetDaoAdapter } from "../adapters/dao/comment-tweet-dao-adapter";
import { commentInMemory } from "../adapters/services/comment-inMemory";
import { commentMongoRepository } from "../adapters/services/comment-repository";
import { tweetInMemory } from "../adapters/services/tweet-inMemory";
import { tweetMongoRepository } from "../adapters/services/tweet-repository";
import { tweetosInMemory } from "../adapters/services/tweetos-inMemory";
import { tweetosMongoRepository } from "../adapters/services/tweetos-repository";
import { DataSources } from "../database";



export function CommentTweetosFeature(): CommentTweet {
    switch (process.env.DATASOURCE) {
       case DataSources.inMemory:
         const commentTweetInMemoryDao = new CommentTweetDaoAdapter(tweetosInMemory, tweetInMemory, commentInMemory)
          return new CommentTweet(commentTweetInMemoryDao);
       case DataSources.mongoDb:
         const creteTweetosMongoDao = new CommentTweetDaoAdapter(tweetosMongoRepository, tweetMongoRepository ,commentMongoRepository)
          return new CommentTweet(creteTweetosMongoDao);
       default: throw new Error("no data source provided");
    }
 }
    
