import { Filter, WithId, ObjectId, OptionalId, InsertOneResult, UpdateFilter, UpdateResult, DeleteResult, FindOptions, Document, FindCursor } from "mongodb";
import { TweetosDto } from "../../../domain/modules/ports/driver/tweetos.dtos";
import { MongoConnection, MongoInterface } from "../../../infra/database";



export class TweetosRepository implements MongoInterface<TweetosDto> {

    constructor(private collection: MongoInterface<TweetosDto>){}

    async findOne(filter: Filter<TweetosDto>): Promise<WithId<TweetosDto> | null> {
        return await this.collection.findOne(filter)
    }

    async insertOne(doc: OptionalId<TweetosDto> | { _id?: ObjectId | undefined; } ): Promise<InsertOneResult<TweetosDto>> {
        return await this.collection.insertOne(doc);
    }

    async updateOne(filter: Filter<TweetosDto>, update: Partial<TweetosDto> | UpdateFilter<TweetosDto>): Promise<UpdateResult> {
        return await this.collection.updateOne(filter,update);
    }

    async deleteOne(filter: Filter<TweetosDto>): Promise<DeleteResult> {
        return await this.collection.deleteOne(filter);
    }

    async deleteMany(filter: Filter<TweetosDto>): Promise<DeleteResult> {
        return await this.collection.deleteMany(filter);
    }

    find(filter: Filter<TweetosDto>, options?: FindOptions<Document> | undefined):FindCursor<WithId<TweetosDto>> {
        return this.collection.find(filter, options);
    }
}

export const tweetosMongoRepository = new TweetosRepository(MongoConnection.getTweetosCollection());