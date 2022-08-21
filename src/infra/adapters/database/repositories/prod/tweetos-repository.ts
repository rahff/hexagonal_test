import { Repository } from "../../../../../domain/ports/out/repositories";
import { FilterQuery } from "../../models/types";
import { TweetosModel } from "../../models/tweetos.model";
import { AbstractRepository } from "./abstract-repository";
import { EntityTarget } from "typeorm";



export class TweetosRepository extends AbstractRepository implements Repository<TweetosModel> {

   constructor(entity: EntityTarget<TweetosModel>){
    super(entity)
   }
   
    async save(data: TweetosModel): Promise<TweetosModel> {
        return this.repository.save(data);
    }
    async findOneBy(where: {_id: string}): Promise<TweetosModel | null> {
        return this.repository.findOneBy(where);
    }
    async findOne(query: FilterQuery<TweetosModel>): Promise<TweetosModel | null> {
        return this.repository.findOne(query);
    }
    async delete(id: string): Promise<TweetosModel> {
        return this.repository.delete(id)
    }
    async update(where: {_id: string}, update: Partial<TweetosModel>): Promise<TweetosModel | null> {
        return await this.repository.update({_id: where._id}, update);
    }
}
const entity: EntityTarget<TweetosModel> = {type: new TweetosModel("","","","", []), name: "TweetosModel"}

export const tweetosMongoRepository = new TweetosRepository(entity)