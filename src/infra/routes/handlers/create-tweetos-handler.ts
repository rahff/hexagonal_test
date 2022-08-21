import { Request, Response } from "express";
import { CreateTweetosFeature } from "../../injectors/create-tweetos-feature";
import { ICreateTweetosRequestDto } from "../../../domain/ports/in/dtos";
import { createtweetController } from '../../controller/tweetos-controller'



export const createTweetosHandler = async (req: Request, res: Response)=> {
    const body: ICreateTweetosRequestDto = req.body;
    const feature = CreateTweetosFeature()
    try {
        const response = await createtweetController(feature, body)
        res.status(201).json({ data: response });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
}

