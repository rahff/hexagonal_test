import { CreateTweetos } from "../../domain/modules/create-tweetos.module";
import { CreatTweetosDaoAdapter } from "../adapters/dao/create-tweetos-dao-adapter";
import { tweetosInMemory } from "../adapters/services/tweetos-inMemory";
import { tweetosMongoRepository } from "../adapters/services/tweetos-repository";
import { DataSources } from "../database";



export function CreateTweetosFeature(): CreateTweetos {
    switch (process.env.DATASOURCE) {
       case DataSources.inMemory:
         const creteTweetosInMemoryDao = new CreatTweetosDaoAdapter(tweetosInMemory)
          return new CreateTweetos(creteTweetosInMemoryDao);
       case DataSources.mongoDb:
         const creteTweetosMongoDao = new CreatTweetosDaoAdapter(tweetosMongoRepository)
          return new CreateTweetos(creteTweetosMongoDao);
       default: throw new Error("no data source provided");
       
    }
 }
    
