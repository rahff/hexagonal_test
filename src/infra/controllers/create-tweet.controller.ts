import { Request, Response } from "express";
import { CreateTweetModule } from "../../core/app/modules/createTweet.module";
import { CreateTweetRequestDto } from "../../core/ports/driver/tweet.dto";




export const createTweetController = async (req: Request, res: Response)=> {
    try {
        const feature = CreateTweetModule.get()
        const createTweetRequestDto = new CreateTweetRequestDto(req.body);
        const response = await feature.execute(createTweetRequestDto);
        res.status(201).json({ data: response });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

