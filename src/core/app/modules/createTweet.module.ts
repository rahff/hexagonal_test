import { CreateTweetDaoAdapter } from "../../../infra/adapters/dao/create-tweet-dao-adapter";
import { CreateTweet } from "../features/create-tweet.feature";
import { tweetMongoRepository } from "../../../infra/adapters/repositories/tweet-repository";
import { tweetosMongoRepository } from "../../../infra/adapters/repositories/tweetos-repository";


export class CreateTweetModule {

    static get(): CreateTweet {
        const createTweetMongoDao = new CreateTweetDaoAdapter(tweetMongoRepository, tweetosMongoRepository)
        return new CreateTweet(createTweetMongoDao);
    }

    static forTesting(): CreateTweet {
        const createTweetMongoDao = new CreateTweetDaoAdapter(tweetMongoRepository, tweetosMongoRepository)
        return new CreateTweet(createTweetMongoDao);
    }
}