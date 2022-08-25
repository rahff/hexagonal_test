import { Request, Response } from "express";
import { GetTweetListModule } from "../../domain/modules/getTweetList.module";

export const getTweetListController = async (req: Request, res: Response) => {
    try {
        const feature = GetTweetListModule.get();
        const tweetList = await feature.get({});
        res.status(200).json({data: tweetList});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}