import { CreateTweetFeature } from "../../../domain/features/create-tweet-feature";
import { TweetController } from "../../controller/tweet-controller";
import { tweetRepositoryInMemoInstance } from "../../database/repositories/inMemory/tweet-repository";
import { tweetosRepositoryInMemoInstance } from "../../database/repositories/inMemory/tweetos-repository";
import { Request, Response } from "express";

export const createTweethandler = async (req: Request, res: Response)=> {
    const body = req.body;
    const feature = CreateTweetFeature(tweetRepositoryInMemoInstance, tweetosRepositoryInMemoInstance)
    const controller = new TweetController(feature)
    try {
        const response = await controller.createtweetHandler(body)
        res.status(201).json({
            data: response
        })
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
}