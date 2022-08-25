import { Filter, WithId, ObjectId, OptionalId, InsertOneResult, UpdateFilter, UpdateResult, DeleteResult, FindOptions, Document, FindCursor } from "mongodb";
import { TweetDto } from "../../../core/ports/driver/tweet.dto";
import { MongoConnection, MongoInterface } from "../../database";
import { AbstractMongoRepository } from "./abstract-repository";



export class TweetRepository extends AbstractMongoRepository<TweetDto> implements MongoInterface<TweetDto> {

    constructor(protected collection: MongoInterface<TweetDto>){
        super(collection);
    }
}

export const tweetMongoRepository = new TweetRepository(MongoConnection.getTweetCollection())