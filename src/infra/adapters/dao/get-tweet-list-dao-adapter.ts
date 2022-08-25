import { FindCursor, WithId } from "mongodb";
import { GetTweetListDao } from "src/core/ports/driven/get-twwet-list-dao";
import { TweetDto } from "../../../core/ports/driver/tweet.dto";
import { MongoInterface } from "../../../infra/database";

export class GetTweetListDaoAdapter implements GetTweetListDao {

    constructor(private tweetRepository: MongoInterface<TweetDto>){}

   async getTweetList(): Promise<TweetDto[]> {
        const cursor = await new Promise<FindCursor<WithId<TweetDto>>>((resolve, reject) => {
            resolve(this.tweetRepository.find({}).limit(10));
        })
        const mappedCursor = await cursor.map<TweetDto>((entity: TweetDto)=> entity).toArray()
        return mappedCursor;
    }
}