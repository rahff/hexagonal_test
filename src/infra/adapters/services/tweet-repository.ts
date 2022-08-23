import { Filter, WithId, ObjectId, OptionalId, InsertOneResult, UpdateFilter, UpdateResult, DeleteResult, FindOptions, Document, FindCursor } from "mongodb";
import { TweetDto } from "../../../domain/modules/ports/driver/tweet.dto";
import { MongoConnection, MongoInterface } from "../../../infra/database";



export class TweetRepository implements MongoInterface<TweetDto> {

    constructor(private collection: MongoInterface<TweetDto>){}

    async findOne(filter: Filter<TweetDto>): Promise<WithId<TweetDto> | null> {
        return await this.collection.findOne(filter)
    }

    async insertOne(doc: OptionalId<TweetDto> | { _id?: ObjectId | undefined; } ): Promise<InsertOneResult<TweetDto>> {
        return await this.collection.insertOne(doc);
    }

    async updateOne(filter: Filter<TweetDto>, update: Partial<TweetDto> | UpdateFilter<TweetDto>): Promise<UpdateResult> {
        return await this.collection.updateOne(filter,update);
    }

    async deleteOne(filter: Filter<TweetDto>): Promise<DeleteResult> {
        return await this.collection.deleteOne(filter);
    }

    async deleteMany(filter: Filter<TweetDto>): Promise<DeleteResult> {
        return await this.collection.deleteMany(filter);
    }

    find(filter: Filter<TweetDto>, options?: FindOptions<Document> | undefined):FindCursor<WithId<TweetDto>> {
        return this.collection.find(filter, options);
    }

}

export const tweetMongoRepository = new TweetRepository(MongoConnection.getTweetCollection())