import { Repository } from "../../../../../domain/ports/out/repositories";
import { BaseModel } from "../../models/inMemory/base-model";
import { FilterQuery } from "../../models/inMemory/types";

export class AbstractRepository<T extends BaseModel> {

    protected data: T[] = [];
    
    async create(data: T): Promise<T> {
        this.data.push(data);
        return data;
    }

    async findOneAndUpdate(query: FilterQuery<T>, update: Partial<T>): Promise<T> {
        throw new Error("Method not implemented.");
    }

    async findOne(filterQuery: FilterQuery<T>): Promise<T | null> {
        const tweetos = this.data.find((entity: any)=> {
            let predicate: boolean = false;
            for (const key in entity) {
                if (Object.prototype.hasOwnProperty.call(entity, key)) {
                    if(key in filterQuery){
                        predicate = filterQuery[key] === entity[key];
                    }
                }
            }
            return predicate;
        });
        if(!tweetos) return null;
        return tweetos;
    }

    async findById(id: string): Promise<T | null> {
        const entity = this.data.find((entity: T) => entity.id === id);
        if(!entity) return null;
        return entity;
    }

    async deleteOne(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    }

    async updateOne(id: string, update: Partial<T>): Promise<T | null> {
        const entity = await this.findById(id);
        if(entity)
            return {...entity, ...update}
        return null
    }
}