import { Tweet } from "../../../../../domain/models/tweet";
import { Repository } from "../../../../../domain/ports/repositories";

export class TweetRepository implements Repository<Tweet> {

    private data: Tweet[] =[]

    async create(data: Tweet): Promise<Tweet> {
        this.data.push(data);
        return data;
    }

    async findById(id: string): Promise<Tweet | null> {
        const tweet = this.data.find((tweet: Tweet)=> tweet.getId() === id);
        if(!tweet) return null;
        return tweet;
    }

    async deleteOne(id: string): Promise<Tweet> {
        throw new Error("Method not implemented.");
    }

    async updateOne(id: string, update: Partial<Tweet>): Promise<Tweet> {
        throw new Error("Method not implemented.");
    }

}

export const tweetRepositoryInMemoInstance = new TweetRepository()