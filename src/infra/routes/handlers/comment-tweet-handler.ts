import { Request, Response } from "express";
import { ICommentTweetDto } from "../../../domain/modules/ports/driver/comment.dto";
import { CommentTweetosFeature } from "../../../infra/injectors/comment-tweet-feature";
import { commentTweetController } from "../../../infra/controller/comment-controller";



export const commentTweetHandler = async (req: Request, res: Response)=> {
    const body: ICommentTweetDto = req.body;
    const feature = CommentTweetosFeature()
    try {
        const response = await commentTweetController(feature, body)
        res.status(201).json({ data: response });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
}