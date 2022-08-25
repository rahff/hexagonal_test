import { CommentDto } from "src/domain/ports/driver/comment.dto";
import { TweetDto } from "src/domain/ports/driver/tweet.dto";
import { TweetosDto } from "src/domain/ports/driver/tweetos.dtos";
import { MongoInterface } from "src/infra/database";
import { CommentTweetDao } from "../../../domain/ports/driven/comment-tweet-dao";

export class CommentTweetDaoAdapter implements CommentTweetDao {

    constructor(private tweetosRepository: MongoInterface<TweetosDto>, 
                private tweetRepository: MongoInterface<TweetDto>,
                private commentRepository: MongoInterface<CommentDto>){}

    async findTweetosById(_id: string): Promise<TweetosDto | null> {
        const foundedTweetos = await this.tweetosRepository.findOne({_id});
        if(!foundedTweetos) return null;
        return foundedTweetos;
    }

    async findTweetById(_id: string): Promise<TweetDto | null> {
        const foundedTweet = await this.tweetRepository.findOne({_id});
        if(!foundedTweet) return null;
        return foundedTweet;
    }

    async saveComment(data: CommentDto): Promise<CommentDto> {
        const savedResult = await this.commentRepository.insertOne(data);
        const savedComment = await this.commentRepository.findOne({_id: savedResult.insertedId});
        if(!savedComment) throw new Error("insert failed");
        return savedComment;
    }

}