import { CreateTweetTask, LikeTweetTask } from "../../domain/modules/ports/driver/api";
import { ICreateTweetRequestDto, CreateTweetRequestDto, LikeTweetRequestDto, TweetDto } from "../../../src/domain/modules/ports/driver/tweet.dto";



export const createtweetController = async (tweetTask: CreateTweetTask, requestBody: ICreateTweetRequestDto): Promise<TweetDto> => {
    try{          
        const createTweetRequestDto = new CreateTweetRequestDto(requestBody);
        const response = await tweetTask.execute(createTweetRequestDto);
        return response;
    }catch(error: any){
        throw error;        
    }
}

export const likeTweetController = async (tweetTask: LikeTweetTask, requestParam: string): Promise<TweetDto> => {
    try {
        const likeTweetRequest: LikeTweetRequestDto = { tweetId: requestParam };
        const response = await tweetTask.execute(likeTweetRequest);
        return response;
    } catch (error: any) {
        throw error;
    }
}