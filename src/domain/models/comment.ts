import { CommentDto } from "../modules/ports/driver/comment.dto";
import { TweetosDto } from "../modules/ports/driver/tweetos.dtos";



export class Comment {
    private _id: string;
    private tweetos: TweetosDto;
    private content: string;
    private tweetRefId: string;

    constructor(tweetos: TweetosDto, content: string, tweetRefId: string, _id: string){
        this.content = content;
        this.tweetRefId = tweetRefId;
        this.tweetos = tweetos
        this._id = _id;
        if(this.content.length < 1) throw new Error("the comment is empty");
    }

    getCommentDto(): CommentDto {
        return {
            _id: this._id,
            tweetos: this.tweetos,
            content: this.content,
            tweetRefId: this.tweetRefId
        }
    }

    getContent(): string {
        return this.content;
    }
}