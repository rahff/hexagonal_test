import { Tweet } from "../../domain/models/tweet";
import { Task } from "../../domain/ports/in/api";
import { CreateTweetRequestDto, ICreateTweetRequestDto, LikeTweetRequestDto } from "../../domain/ports/in/dtos";



    export const createtweetController = async (tweetTask: Task<Tweet>, requestBody: ICreateTweetRequestDto): Promise<Tweet> => {
        try{          
            const createTweetRequestDto = new CreateTweetRequestDto(requestBody);
            const response = await tweetTask.execute(createTweetRequestDto);
            return response;
        }catch(error: any){
            throw error;        
        }
    }

    export const likeTweetController = async (tweetTask: Task<Tweet>, requestParam: string): Promise<Tweet> => {
        try {
            const likeTweetRequest: LikeTweetRequestDto = { tweetId: requestParam };
            const response = await tweetTask.execute(likeTweetRequest);
            return response;
        } catch (error: any) {
            throw error;
        }
    }