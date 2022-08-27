import { Request, Response } from "express";
import { commentTweetService } from "../services/comment.service";
import { CommentTweetModule } from "../../core/app/modules/commentTweet.module";



export const commentTweetController = async (req: Request, res: Response)=> {
    try {
        const body = req.body;
        const feature = CommentTweetModule.get();
        const response = await commentTweetService(feature, body)
        res.status(201).json({ data: response });
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}