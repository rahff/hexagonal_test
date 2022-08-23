import { CommentDto } from "../driver/comment.dto";
import { TweetDto } from "../driver/tweet.dto";
import { TweetosDto } from "../driver/tweetos.dtos";

export interface CommentTweetDao {
    findTweetosById(_id: string): Promise<TweetosDto | null>;
    findTweetById(_id: string): Promise<TweetDto | null>;
    saveComment(data: CommentDto): Promise<CommentDto>;
}