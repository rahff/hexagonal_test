import { CreateTweetFeature } from "../../injectors/create-tweet-feature";
import { createtweetController } from "../../controller/tweet-controller";
import { Request, Response } from "express";
import { ICreateTweetRequestDto } from "../../../domain/modules/ports/driver/tweet.dto";




export const createTweetHandler = async (req: Request, res: Response)=> {
    const body: ICreateTweetRequestDto = req.body;
    const feature = CreateTweetFeature();
    try {
        const response = await createtweetController(feature, body);
        res.status(201).json({ data: response });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

