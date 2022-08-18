import { Request, Response } from "express";
import { Tweet } from "../../domain/models/tweet";
import { Task } from "../interfaces/api";
import { CreateTweetRequestDto, ICreateTweetRequestDto } from "../interfaces/dtos";

export class TweetController {
    
    constructor(private task: Task<Tweet>){}

    async createtweetHandler(requestBody: ICreateTweetRequestDto): Promise<any> {
        try{          
            const createTweetRequestDto = new CreateTweetRequestDto(requestBody);
            const response = await this.task.execute(createTweetRequestDto);
            return response;
        }catch(e: any){
            throw e;        
        }
    }
}