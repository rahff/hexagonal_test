import { Filter, WithId, ObjectId, OptionalId, InsertOneResult, UpdateFilter, UpdateResult, DeleteResult, FindOptions, Document, FindCursor } from "mongodb";
import { CommentDto } from "../../../domain/modules/ports/driver/comment.dto";
import { MongoInterface } from "../../../infra/database";
import { generateId } from "../../../domain/utils";

export class CommentInMemory implements MongoInterface<CommentDto> {

    private data: CommentDto[] = []
    
    async findOne(filter: Filter<any>): Promise<WithId<CommentDto> | null> {
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

    async insertOne(doc: OptionalId<CommentDto>): Promise<InsertOneResult<CommentDto>> {
        const id = doc._id ? doc._id : generateId();
        this.data.push({...doc, _id: id});
        const saveResult: InsertOneResult<CommentDto> = { acknowledged: true, insertedId: id};
        return saveResult;
    }

    async updateOne(filter: Filter<CommentDto>, update: Partial<CommentDto> | UpdateFilter<CommentDto>): Promise<UpdateResult> {
        const entity = await this.findOne(filter);
        this.data.map((currentValue: CommentDto, index: number)=> {
            if(currentValue._id === entity?._id){
                this.data[index] = {...entity, ...update} as CommentDto
            }
        });
        return { acknowledged: true, matchedCount: 1, modifiedCount: 1, upsertedCount: 1, upsertedId: new ObjectId(entity?._id) }
    }

    async deleteOne(filter: Filter<CommentDto>): Promise<DeleteResult> {
        const foundedEntity = await this.findOne(filter);
        if(!foundedEntity) return { acknowledged: false, deletedCount: 0 }
        this.data = this.data.filter((entity: CommentDto) => entity._id !== foundedEntity._id);
        return { acknowledged: true, deletedCount: 1 };
    }

    deleteMany(filter: Filter<CommentDto>): Promise<DeleteResult> {
        throw new Error("Method not implemented.");
    }

    find(filter: Filter<CommentDto>, options?: FindOptions<Document> | undefined): FindCursor<WithId<CommentDto>> {
        throw new Error("Method not implemented.");
    }
}


export const commentInMemory = new CommentInMemory();