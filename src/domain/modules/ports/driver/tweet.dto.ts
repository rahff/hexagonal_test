import { TweetosDto } from "./tweetos.dtos";
import { Comment } from "../../../models/comment";
import { CommentDto } from "./comment.dto";



export interface TweetDto {
    _id: string,  
    content: string,   
    tweetos: TweetosDto,  
    likes: number
}

export interface ICreateTweetRequestDto {
    content: string;
    tweetosId: string;
}

export class CreateTweetRequestDto {
    content: string;
    tweetosId: string;

    constructor(data: ICreateTweetRequestDto){
        try {
            this.content = data.content;
            this.tweetosId = data.tweetosId;
        } catch (error) {
            throw new Error("invalid CreateTweetRequestDto");
        }
    }
}

export class LikeTweetRequestDto {
    tweetId: string;
    constructor(tweetId: string){
        this.tweetId = tweetId;
        if(tweetId.length < 32) throw new Error("invalid tweet id");
    }
}
