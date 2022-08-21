import { Repository } from "../../../../../domain/ports/out/repositories";
import { FilterQuery } from "../../models/types";
import { TweetModel } from "../../models/tweet.model";
import { AbstractRepository } from "./abstract-repository";
import { EntityTarget } from "typeorm";
import { FakeTweetos } from "../../../../../../spec/infra/database/data";



export class TweetRepository extends AbstractRepository implements Repository<TweetModel> {

   constructor(entity: EntityTarget<TweetModel>){
    super(entity)
   }

    async save(data: TweetModel): Promise<TweetModel> {
        return this.repository.save(data);
    }
    async findOneBy(where: {_id: string}): Promise<TweetModel | null> {
        return this.repository.findOneBy(where);
    }
    async findOne(query: FilterQuery<TweetModel>): Promise<TweetModel | null> {
        return this.repository.findOne(query);
    }
    async delete(_id: string): Promise<TweetModel> {
        return this.repository.delete(_id)
    }
    async update(where: {_id: string}, update: Partial<TweetModel>): Promise<TweetModel | null> {
        await this.repository.update({_id: where._id}, update);
        return this.repository.findOneBy({_id: where._id});
    }
}

const entity: EntityTarget<TweetModel> = {type: new TweetModel("","",FakeTweetos,0, []), name: "TweetModel"}

export const tweetMongoRepository = new TweetRepository(entity)