import { CommentTweetDaoAdapter } from "../../../infra/adapters/dao/comment-tweet-dao-adapter";
import { CommentTweet } from "../features/comment-tweet.feature";
import { tweetosMongoRepository } from "../../../infra/adapters/repositories/tweetos-repository";
import { tweetMongoRepository } from "../../../infra/adapters/repositories/tweet-repository";
import { commentMongoRepository } from "../../../infra/adapters/repositories/comment-repository";

export class CommentTweetModule {

    static get(): CommentTweet {
        const creteTweetosMongoDao = new CommentTweetDaoAdapter(tweetosMongoRepository, tweetMongoRepository ,commentMongoRepository)
        return new CommentTweet(creteTweetosMongoDao);
    }

    static forTesting(): CommentTweet {
        const creteTweetosMongoDao = new CommentTweetDaoAdapter(tweetosMongoRepository, tweetMongoRepository ,commentMongoRepository)
        return new CommentTweet(creteTweetosMongoDao);
    }
}
