import { LikeTweetDaoAdapter } from "../../../infra/adapters/dao/like-tweet-dao-adapter";
import { LikeTweet } from "../features/like-tweet.feature";
import { tweetMongoRepository } from "../../../infra/adapters/repositories/tweet-repository";

export class LikeTweetModule {

    static get(): LikeTweet {
        const likeTweetMongoDao = new LikeTweetDaoAdapter(tweetMongoRepository)
         return new LikeTweet(likeTweetMongoDao);
    }

    static forTesting(): LikeTweet {
        const likeTweetMongoDao = new LikeTweetDaoAdapter(tweetMongoRepository)
         return new LikeTweet(likeTweetMongoDao);
    }
}