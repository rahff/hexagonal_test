import { Request, Response } from "express";
import { LikeTweetModule } from "../../app/modules/likeTweet.module";
import { likeTweetService } from "../services/tweet.service";




export const likeTweetController = async (req: Request, res: Response) => {
    try {
        const { tweetId } = req.params;
        const feature = LikeTweetModule.get();
        const response = await likeTweetService(feature, tweetId);
        res.status(200).json({ data: response });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}