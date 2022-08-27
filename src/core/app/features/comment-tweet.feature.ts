import { Comment } from "../../models/comment";
import { CommentTweetTask } from "../../ports/driver/api";
import { CommentTweetDao } from "../../ports/driven/comment-tweet-dao";
import { CommentDto, CommentTweetRequestDto } from "../../ports/driver/comment.dto";
import { generateId } from "../utils";




export class CommentTweet implements CommentTweetTask {

    constructor(private commentTweetDao: CommentTweetDao){}


    async execute(data: CommentTweetRequestDto): Promise<CommentDto> {
        try {
            const foundedTweetos = await this.commentTweetDao.findTweetosById(data.tweetosId);
            const foundedTweet = await this.commentTweetDao.findTweetById(data.tweetRefId);
            if(!foundedTweetos) throw new Error("tweetos does not exist");
            if(!foundedTweet) throw new Error("this tweet does not exist");
            const comment = new Comment(foundedTweetos, data.content, foundedTweet._id, generateId());
            const savedComment = await this.commentTweetDao.saveComment(comment.getCommentDto());
            return savedComment;
        } catch (error: any) {
            throw error;
        }
    }
    
}