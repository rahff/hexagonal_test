import { Request, Response } from "express";
import { tweetRepositoryInMemoInstance } from "../../adapters/database/repositories/inMemory/tweet-repository";
import { likeTweetController } from "../../controller/tweet-controller";
import { CreateLikeTweetFeature } from "../../injectors/like-tweet-feature";

export const likeTweetHandler = async (req: Request, res: Response) => {
    const { tweetId } = req.params;
    const feature = CreateLikeTweetFeature(tweetRepositoryInMemoInstance);
    try {
        const response = await likeTweetController(feature, tweetId);
        res.status(200).json({ data: response });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}