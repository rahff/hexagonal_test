import { FilterQuery } from "../../../infra/adapters/database/models/types";



export interface Repository<T> {
    save(data: T): Promise<T>;
    findOneBy(where: {_id: string}): Promise<T | null>;
    findOne(query: FilterQuery<T>): Promise<T | null>;
    delete(_id: string): Promise<T>;
    update(where: {_id: string}, update: Partial<T>): Promise<T | null>
}