import { Tweet } from "../../domain/models/tweet";
import { Task } from "../../domain/ports/api";
import { CreateTweetRequestDto, ICreateTweetRequestDto } from "../../domain/ports/dtos";

export class TweetController {
    
    constructor(private createTweetTask: Task<Tweet>){}

    async createtweetHandler(requestBody: ICreateTweetRequestDto): Promise<any> {
        try{          
            const createTweetRequestDto = new CreateTweetRequestDto(requestBody);
            const response = await this.createTweetTask.execute(createTweetRequestDto);
            return response;
        }catch(e: any){
            throw e;        
        }
    }
}