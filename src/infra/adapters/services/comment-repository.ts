import { Filter, WithId, ObjectId, OptionalId, InsertOneResult, UpdateFilter, UpdateResult, DeleteResult, FindOptions, Document, FindCursor } from "mongodb";
import { CommentDto } from "../../../domain/modules/ports/driver/comment.dto";
import { MongoConnection, MongoInterface } from "../../../infra/database";



export class CommentRepository implements MongoInterface<CommentDto> {

    constructor(private collection: MongoInterface<CommentDto>){}

    async findOne(filter: Filter<CommentDto>): Promise<WithId<CommentDto> | null> {
        return await this.collection.findOne(filter);
    }

    async insertOne(doc: OptionalId<CommentDto> | { _id?: ObjectId | undefined; } ): Promise<InsertOneResult<CommentDto>> {
        return await this.collection.insertOne(doc);
    }

    async updateOne(filter: Filter<CommentDto>, update: Partial<CommentDto> | UpdateFilter<CommentDto>): Promise<UpdateResult> {
        return await this.collection.updateOne(filter,update);
    }

    async deleteOne(filter: Filter<CommentDto>): Promise<DeleteResult> {
        return await this.collection.deleteOne(filter);
    }

    async deleteMany(filter: Filter<CommentDto>): Promise<DeleteResult> {
        return await this.collection.deleteMany(filter);
    }

    find(filter: Filter<CommentDto>, options?: FindOptions<Document> | undefined):FindCursor<WithId<CommentDto>> {
        return this.collection.find(filter, options);
    }

}

export const commentMongoRepository = new CommentRepository(MongoConnection.getCommentCollection())