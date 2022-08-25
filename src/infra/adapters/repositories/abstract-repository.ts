import { DeleteResult, Filter, FindCursor, FindOptions, InsertOneResult, ObjectId, OptionalId, UpdateFilter, UpdateResult, WithId } from "mongodb";
import { MongoInterface } from "src/infra/database";

export class AbstractMongoRepository<T> {
    
    constructor(protected collection: MongoInterface<T>){}

    async findOne(filter: Filter<T>): Promise<WithId<T> | null> {
        return await this.collection.findOne(filter);
    }

    async insertOne(doc: OptionalId<T> | { _id?: ObjectId | undefined; } ): Promise<InsertOneResult<T>> {
        return await this.collection.insertOne(doc);
    }

    async updateOne(filter: Filter<T>, update: Partial<T> | UpdateFilter<T>): Promise<UpdateResult> {
        return await this.collection.updateOne(filter,update);
    }

    async deleteOne(filter: Filter<T>): Promise<DeleteResult> {
        return await this.collection.deleteOne(filter);
    }

    async deleteMany(filter: Filter<T>): Promise<DeleteResult> {
        return await this.collection.deleteMany(filter);
    }

    find(filter: Filter<T>, options?: FindOptions<Document> | undefined):FindCursor<WithId<T>> {
        return this.collection.find(filter, options);
    }
}