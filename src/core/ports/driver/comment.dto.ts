import { TweetosDto } from "./tweetos.dtos";

export interface CommentDto {
    _id: string
    tweetos: TweetosDto;
    content: string;
    tweetRefId: string;
}

export interface ICommentTweetDto {
    tweetosId: string;
    content: string;
    tweetRefId: string;
}

export class CommentTweetRequestDto {
    tweetosId: string;
    content: string;
    tweetRefId: string;

    constructor(data: ICommentTweetDto){
        try {
            this.tweetosId = data.tweetosId;
            this.tweetRefId = data.tweetRefId;
            this.content = data.content;
            if(this.content.length === 0) throw new Error("Comment must not be empty");
        } catch (error: any) {
            throw new Error(error.message ? error.message :'invalid CommentTweetRequestDto');
        }
    }
}