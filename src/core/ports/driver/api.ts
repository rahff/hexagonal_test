import { CommentDto, CommentTweetRequestDto } from "./comment.dto";
import { CreateTweetRequestDto, LikeTweetRequestDto, TweetDto } from "./tweet.dto";
import { CreateTweetosRequestDto, TweetosDto } from "./tweetos.dtos";

export interface CreateTweetTask {
    execute(data: CreateTweetRequestDto): Promise<TweetDto>;
}

export interface CreateTweetosTask {
    execute(data: CreateTweetosRequestDto): Promise<{tweetos: TweetosDto, token: string}>;
}

export interface CommentTweetTask {
    execute(data: CommentTweetRequestDto): Promise<CommentDto>;
}

export interface LikeTweetTask {
    execute(data: LikeTweetRequestDto): Promise<TweetDto>;
}

export interface GetTweetListQuery {
    get(forWhomIs: {}): Promise<TweetDto[]>
}