import { Request, Response } from "express";
import { CommentTweetModule } from "../../core/app/modules/commentTweet.module";
import { CommentTweetRequestDto } from "../../core/ports/driver/comment.dto";



export const commentTweetController = async (req: Request, res: Response)=> {
    try {
        const feature = CommentTweetModule.get();
        const commentTweetRequest = new CommentTweetRequestDto(req.body);
        const response = await feature.execute(commentTweetRequest);
        res.status(201).json({ data: response });
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}