import { Filter, WithId, ObjectId, OptionalId, InsertOneResult, UpdateFilter, UpdateResult, DeleteResult, FindOptions, Document, FindCursor } from "mongodb";
import { CommentDto } from "../../../domain/ports/driver/comment.dto";
import { MongoConnection, MongoInterface } from "../../database";
import { AbstractMongoRepository } from "./abstract-repository";



export class CommentRepository extends AbstractMongoRepository<CommentDto> implements MongoInterface<CommentDto> {

    constructor(protected collection: MongoInterface<CommentDto>){
        super(collection);
    }
}

export const commentMongoRepository = new CommentRepository(MongoConnection.getCommentCollection())