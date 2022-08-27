import { Filter, WithId, OptionalId, InsertOneResult, UpdateFilter, UpdateResult, DeleteResult, FindOptions, Document, FindCursor, ObjectId } from "mongodb";
import { generateId } from "../../../core/app/utils";
import { TweetosDto } from "../../../core/ports/driver/tweetos.dtos";
import { MongoInterface } from "../../database";
import { TweetosInMemoryDB } from "../../database/inMemory.data";



export class TweetosInMemory implements MongoInterface<TweetosDto> {
    
    private data: TweetosDto[] = [...TweetosInMemoryDB]

    async findOne(filter: Filter<any>): Promise<WithId<TweetosDto> | null> {
        const keyFilter = Object.keys(filter)[0];
        const isNestedObjectFilter = /(\b.*\.)(\b.+)/;
        const foundedEntity = this.data.find((tweet: any) => {
            let predicateResult: boolean = false;
            for (const key in tweet) {
                if (Object.prototype.hasOwnProperty.call(tweet, key)) {
                    if(isNestedObjectFilter.test(keyFilter)){
                        const firstLevelKey = keyFilter.split('.')[0];
                        const secondLevelKey = keyFilter.split('.')[1];
                        if(firstLevelKey === key){
                            predicateResult = tweet[firstLevelKey][secondLevelKey] === filter[keyFilter];
                        }
                    }
                    else if(keyFilter === key){
                        predicateResult = tweet[key] === filter[keyFilter]
                    }
                }
            }
            return predicateResult;
        });
        if(!foundedEntity) return null;
        return foundedEntity;
    }

    async insertOne(doc: OptionalId<TweetosDto>): Promise<InsertOneResult<TweetosDto>> {
        const id = doc._id ? doc._id : generateId();
        this.data.push({...doc, _id: id});
        const saveResult: InsertOneResult<TweetosDto> = { acknowledged: true, insertedId: id};
        return saveResult;
    }

    async updateOne(filter: Filter<TweetosDto>, update: Partial<TweetosDto> | UpdateFilter<TweetosDto>): Promise<UpdateResult> {
        const entity = await this.findOne(filter);
        this.data.map((currentValue: TweetosDto, index: number)=> {
            if(currentValue._id === entity?._id){
                this.data[index] = {...entity, ...update} as TweetosDto
            }
        });
        return { acknowledged: true, matchedCount: 1, modifiedCount: 1, upsertedCount: 1, upsertedId: new ObjectId(entity?._id) }
    }

    async deleteOne(filter: Filter<TweetosDto>): Promise<DeleteResult> {
        const foundedEntity = await this.findOne(filter);
        if(!foundedEntity) return { acknowledged: false, deletedCount: 0 }
        this.data = this.data.filter((entity: TweetosDto) => entity._id !== foundedEntity._id);
        return { acknowledged: true, deletedCount: 1 };
    }

    deleteMany(filter: Filter<TweetosDto>): Promise<DeleteResult> {
        throw new Error("Method not implemented.");
    }

    find(filter: Filter<TweetosDto>, options?: FindOptions<Document> | undefined): FindCursor<WithId<TweetosDto>> {
        throw new Error("Method not implemented.");
    }
}

export const tweetosInMemory = new TweetosInMemory();