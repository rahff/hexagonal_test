import { GetTweetList } from "../features/get-tweet-list.feature";
import { GetTweetListDaoAdapter } from "../../../infra/adapters/dao/get-tweet-list-dao-adapter";
import { tweetMongoRepository } from "../../../infra/adapters/repositories/tweet-repository";

export class GetTweetListModule {

    static get(): GetTweetList {
        const getTweetListMongoDao = new GetTweetListDaoAdapter(tweetMongoRepository);
        return new GetTweetList(getTweetListMongoDao);
    }

    static forTesting(): GetTweetList {
        const getTweetListMongoDao = new GetTweetListDaoAdapter(tweetMongoRepository);
        return new GetTweetList(getTweetListMongoDao);
    }
}
