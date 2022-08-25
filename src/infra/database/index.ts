import * as MDB from "mongodb"
import { TweetDto } from "src/domain/ports/driver/tweet.dto";
import { TweetosDto } from "src/domain/ports/driver/tweetos.dtos";
import { CommentDto } from "src/domain/ports/driver/comment.dto";



export enum DataSources {
    inMemory = "inMemory",
    mongoDb = "mongoDB"
}

export interface MongoInterface<T> {
    findOne(filter: MDB.Filter<T>): Promise<MDB.WithId<T> | null>;
    insertOne(doc: MDB.OptionalId<T> | {_id?: MDB.ObjectId}): Promise<MDB.InsertOneResult<T>>
    updateOne(filter: MDB.Filter<T>, update: Partial<T> | MDB.UpdateFilter<T>): Promise<MDB.UpdateResult>
    deleteOne(filter: MDB.Filter<T>): Promise<MDB.DeleteResult>
    deleteMany(filter: MDB.Filter<T>): Promise<MDB.DeleteResult>
    find(filter: MDB.Filter<T>, options?: MDB.FindOptions): MDB.FindCursor<MDB.WithId<T>>
 }

export class DBMongo {

    private mongoClient!: MDB.MongoClient;
    private TweetCollection!: MDB.Collection;
    private TweetosCollection!: MDB.Collection;
    private CommentCollection!: MDB.Collection;
    private DB!: MDB.Db;

    constructor(private host: string, private database: string){
       this.mongoClient = new MDB.MongoClient(this.host);
       this.initDB();
    }

    async start(): Promise<void> {
       await this.mongoClient.connect();
       console.log("client connected");
    }

    public initDB(): void {
        this.DB = this.mongoClient.db(this.database);
        this.TweetCollection = this.DB.collection('tweet');
        this.TweetosCollection = this.DB.collection('tweetos');
        this.CommentCollection = this.DB.collection('comment');
    }

    public getDB(): MDB.Db {
        return this.DB;
    }

    public getTweetCollection(): MongoInterface<TweetDto> {
        return {
           findOne: this.TweetCollection.findOne.bind(this.TweetCollection),
           insertOne: this.TweetCollection.insertOne.bind(this.TweetCollection),
           updateOne: this.TweetCollection.updateOne.bind(this.TweetCollection),
           deleteOne: this.TweetCollection.deleteOne.bind(this.TweetCollection),
           deleteMany: this.TweetCollection.deleteMany.bind(this.TweetCollection),
           find: this.TweetCollection.find.bind(this.TweetCollection)
        };
    }

    public getTweetosCollection(): MongoInterface<TweetosDto> {
        return {
            findOne: this.TweetosCollection.findOne.bind(this.TweetosCollection),
            insertOne: this.TweetosCollection.insertOne.bind(this.TweetosCollection),
            updateOne: this.TweetosCollection.updateOne.bind(this.TweetosCollection),
            deleteOne: this.TweetosCollection.deleteOne.bind(this.TweetosCollection),
            deleteMany: this.TweetosCollection.deleteMany.bind(this.TweetosCollection),
            find: this.TweetosCollection.find.bind(this.TweetosCollection)
         };
    }

    public getCommentCollection(): MongoInterface<CommentDto> {
        return {
            findOne: this.CommentCollection.findOne.bind(this.CommentCollection),
            insertOne: this.CommentCollection.insertOne.bind(this.CommentCollection),
            updateOne: this.CommentCollection.updateOne.bind(this.CommentCollection),
            deleteOne: this.CommentCollection.deleteOne.bind(this.CommentCollection),
            deleteMany: this.CommentCollection.deleteMany.bind(this.CommentCollection),
            find: this.CommentCollection.find.bind(this.CommentCollection)
         };
    }


    async destroy(): Promise<void> {
      await this.mongoClient.close();
    }

}

export const MongoConnection = new DBMongo("mongodb://localhost:27017", "tweet");