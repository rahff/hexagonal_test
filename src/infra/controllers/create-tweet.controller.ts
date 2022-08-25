import { createTweetService } from "../services/tweet.service";
import { Request, Response } from "express";
import { ICreateTweetRequestDto } from "../../core/ports/driver/tweet.dto";
import { CreateTweetModule } from "../../app/modules/createTweet.module";




export const createTweetController = async (req: Request, res: Response)=> {
    try {
        const body: ICreateTweetRequestDto = req.body;
        const feature = CreateTweetModule.get();
        const response = await createTweetService(feature, body);
        res.status(201).json({ data: response });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

