import { Request, Response } from "express";
import { CreateTweetosFeature } from "../../injectors/create-tweetos-feature";
import { createtweetosController } from '../../controller/tweetos-controller'
import { ICreateTweetosRequestDto } from "../../../domain/modules/ports/driver/tweetos.dtos";



export const createTweetosHandler = async (req: Request, res: Response)=> {
    const body: ICreateTweetosRequestDto = req.body;
    const feature = CreateTweetosFeature()
    try {
        const response = await createtweetosController(feature, body)
        res.status(201).json({ data: response });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
}

