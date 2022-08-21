import { Repository } from "../../../../../domain/ports/out/repositories";
import { FilterQuery } from "../../models/types";

export class AbstractInMemoryRepository<T=any> implements Repository<T> {

    protected data: T[] = [];
    
    async save(data: T): Promise<T> {
        this.data.push(data);
        return data;
    }
    async findOneBy(where: {_id: string}): Promise<T | null> {
        const entity = this.data.find((e: any)=> e._id === where._id);
        if(!entity) return null;
        return entity;
    }

    async findOne(query: FilterQuery<T>): Promise<T | null> {
        const document = this.data.find((entity: T)=> {
            let predicate: boolean = false;
            for (const key in entity) {
                if (Object.prototype.hasOwnProperty.call(entity, key)) {
                    if(key in query){
                        predicate = query[key] === entity[key];
                    }
                }
            }
            return predicate;
        });
        
        if (!document) return null;
        return document;
    }
    async delete(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async update(where: {_id: string}, update: Partial<T>): Promise<T | null> {
        const entity = await this.findOneBy({_id: where._id});
        if(!entity) return null;
        return { ...entity, update };
    }

    
   
}