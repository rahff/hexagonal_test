import { CreateTweetTask, LikeTweetTask } from "../../core/ports/driver/api";
import { ICreateTweetRequestDto, CreateTweetRequestDto, LikeTweetRequestDto, TweetDto } from "../../core/ports/driver/tweet.dto";



export const createTweetService = async (tweetTask: CreateTweetTask, requestBody: ICreateTweetRequestDto): Promise<TweetDto> => {
    try{          
        const createTweetRequestDto = new CreateTweetRequestDto(requestBody);
        const response = await tweetTask.execute(createTweetRequestDto);
        return response;
    }catch(error: any){
        throw error;        
    }
}

export const likeTweetService = async (tweetTask: LikeTweetTask, requestParam: string): Promise<TweetDto> => {
    try {
        const likeTweetRequest: LikeTweetRequestDto = { tweetId: requestParam };
        const response = await tweetTask.execute(likeTweetRequest);
        return response;
    } catch (error: any) {
        throw error;
    }
}