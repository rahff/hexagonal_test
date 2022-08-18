import { Tweetos } from "../../../../domain/models/tweetos";
import { Repository } from "../../../interfaces/repositories";

export class TweetosRepository implements Repository<Tweetos> {

    private data: Tweetos[] =[]


    async create(data: Tweetos): Promise<Tweetos> {
        this.data.push(data);
        return data;
    }

    async findById(id: string): Promise<Tweetos | null> {
        const tweetos = this.data.find((tweetos: Tweetos)=> tweetos.getId() === id);
        if(!tweetos) return null;
        return tweetos;
    }

    async deleteOne(id: string): Promise<Tweetos> {
        throw new Error("Method not implemented.");
    }

    async updateOne(id: string, update: Partial<Tweetos>): Promise<Tweetos> {
        throw new Error("Method not implemented.");
    }

}

export const tweetosRepositoryInMemoInstance = new TweetosRepository()