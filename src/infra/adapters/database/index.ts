
import { DataSource, EntityManager } from "typeorm";
import { Repository } from "../../../domain/ports/out/repositories";
import { TweetModel } from "./models/tweet.model";
import { TweetosModel } from "./models/tweetos.model";
import { TweetRepository } from "./repositories/inMemory/tweet-repository";
import { TweetosRepository } from "./repositories/inMemory/tweetos-repository";


export class DataSourceFactory {

    static getRepoForFeature(featureName: string, mode: DataSources): Repository<any>[]{
        switch (featureName+mode) {
            case "LikeTweet0":
                return [new TweetRepository()]
            case "LikeTweet1":
                return [new TweetRepository()]
            case "CreateTweet0":
                return [new TweetRepository(), new TweetosRepository()]
            case "CreateTweet1":
                return [new TweetRepository(), new TweetosRepository()]
            case "CreateTweetos0":
                return [new TweetRepository(), new TweetosRepository()]
            case "CreateTweetos1":
                return [new TweetosRepository()]
            default: throw new Error("Feature does not exist");
        }
    }
}

export enum DataSources {
    inMemory,
    mongoDb
}

export class DBMongo {

    async start(): Promise<EntityManager> {
       const dataSource = new DataSource({
           type: "mongodb",
           host: "localhost",
           port: 27017,
           database: "tweet",
           entities: [TweetModel, TweetosModel]
       });
       const entityManager = dataSource.createEntityManager();
       await dataSource.initialize()
       return entityManager;
   }

}

export const MongoConnection = new DBMongo()