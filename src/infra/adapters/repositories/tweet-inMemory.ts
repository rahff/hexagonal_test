import { Filter, WithId, ObjectId, OptionalId, InsertOneResult, UpdateFilter, UpdateResult, DeleteResult, FindOptions, Document, FindCursor } from "mongodb";
import { generateId } from "../../../app/utils";
import { TweetDto } from "../../../core/ports/driver/tweet.dto";
import { MongoInterface } from "../../database";
import { TweetInMemoryDB } from "../../database/inMemory.data";



export class TweetInMemory implements MongoInterface<TweetDto> {

    private data: TweetDto[] = [...TweetInMemoryDB]
    
    async findOne(filter: Filter<any>): Promise<WithId<TweetDto> | null> {
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

    async insertOne(doc: OptionalId<TweetDto>): Promise<InsertOneResult<TweetDto>> {
        const id = doc._id ? doc._id : generateId();
        this.data.push({...doc, _id: id});
        const saveResult: InsertOneResult<TweetDto> = { acknowledged: true, insertedId: id};
        return saveResult;
    }

    async updateOne(filter: Filter<TweetDto>, update: Partial<any> | UpdateFilter<TweetDto>): Promise<UpdateResult> {
        const entity = await this.findOne(filter);
        this.data.map((currentValue: TweetDto, index: number)=> {
            if(currentValue._id === entity?._id){
                if((update.$inc)){
                    this.data[index] = {...entity, likes: ++entity.likes} as TweetDto
                }
                this.data[index] = {...entity, ...update} as TweetDto
            }
        });        
        return { acknowledged: true, matchedCount: 1, modifiedCount: 1, upsertedCount: 1, upsertedId: new ObjectId(entity?._id) }
    }

    async deleteOne(filter: Filter<TweetDto>): Promise<DeleteResult> {
        const foundedEntity = await this.findOne(filter);
        if(!foundedEntity) return { acknowledged: false, deletedCount: 0 }
        this.data = this.data.filter((entity: TweetDto) => entity._id !== foundedEntity._id);
        return { acknowledged: true, deletedCount: 1 };
    }


    deleteMany(filter: Filter<TweetDto>): Promise<DeleteResult> {
        throw new Error("Method not implemented.");
    }

    find(filter: Filter<TweetDto>, options?: FindOptions<Document> | undefined): FindCursor<WithId<TweetDto>> {
        throw new Error("Method not implemented.");
    }
}


export const tweetInMemory = new TweetInMemory();