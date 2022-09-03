import { Request, Response } from "express";
import { CreateTweetosModule } from "../../core/app/modules/createTweetos.module";
import { CreateTweetosRequestDto } from "../../core/ports/driver/tweetos.dtos";



export const createTweetosController = async (req: Request, res: Response)=> {
    try {
        const feature = CreateTweetosModule.get();
        const createTweetosRequestDto = new CreateTweetosRequestDto(req.body);
        const createdTweetos = await feature.execute(createTweetosRequestDto);
        res.status(201).json({ data: createdTweetos });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

