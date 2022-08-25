import { Request, Response } from "express";
import { createTweetosService } from '../services/tweetos.service'
import { ICreateTweetosRequestDto } from "../../domain/ports/driver/tweetos.dtos";
import { CreateTweetosModule } from "../../domain/modules/createTweetos.module";



export const createTweetosController = async (req: Request, res: Response)=> {
    try {
        const body: ICreateTweetosRequestDto = req.body;
        const feature = CreateTweetosModule.get();
        const createdTweetos = await createTweetosService(feature, body);
        res.status(201).json({ data: createdTweetos });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

