import { Filter, WithId, ObjectId, OptionalId, InsertOneResult, UpdateFilter, UpdateResult, DeleteResult, FindOptions, Document, FindCursor } from "mongodb";
import { TweetosDto } from "../../../domain/ports/driver/tweetos.dtos";
import { MongoConnection, MongoInterface } from "../../database";
import { AbstractMongoRepository } from "./abstract-repository";



export class TweetosRepository extends AbstractMongoRepository<TweetosDto> implements MongoInterface<TweetosDto> {

    constructor(protected collection: MongoInterface<TweetosDto>){
        super(collection);
    }
}

export const tweetosMongoRepository = new TweetosRepository(MongoConnection.getTweetosCollection());