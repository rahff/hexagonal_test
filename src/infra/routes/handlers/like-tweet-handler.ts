import { Request, Response } from "express";
import { likeTweetController } from "../../controller/tweet-controller";
import { LikeTweetFeature } from "../../injectors/like-tweet-feature";



export const likeTweetHandler = async (req: Request, res: Response) => {
    const { tweetId } = req.params;
    const feature = LikeTweetFeature();
    try {
        const response = await likeTweetController(feature, tweetId);
        res.status(200).json({ data: response });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}