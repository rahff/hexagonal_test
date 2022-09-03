import { Request, Response } from "express";
import { LikeTweetRequestDto } from "../../core/ports/driver/tweet.dto";
import { LikeTweetModule } from "../../core/app/modules/likeTweet.module";




export const likeTweetController = async (req: Request, res: Response) => {
    try {
        const feature = LikeTweetModule.get();
        const { tweetId } = req.params;
        const likeTweetRequest: LikeTweetRequestDto = { tweetId };
        const response = await feature.execute(likeTweetRequest);
        res.status(200).json({ data: response });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}