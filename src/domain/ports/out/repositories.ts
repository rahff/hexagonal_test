import { BaseModel } from "../../../infra/adapters/database/models/inMemory/base-model";
import { FilterQuery } from "../../../infra/adapters/database/models/inMemory/types";

export interface Repository<T extends BaseModel> {
    create(data: T): Promise<T>;
    findById(id: string): Promise<T | null>;
    findOne(query: FilterQuery<T>): Promise<T | null>;
    deleteOne(id: string): Promise<T>;
    updateOne(id: string, update: Partial<T>): Promise<T | null>
    findOneAndUpdate(query: FilterQuery<T>, update: Partial<T>): Promise<T>
}