import { CreateTweetosTask } from "../../core/ports/driver/api";
import { CreateTweetosRequestDto, ICreateTweetosRequestDto, TweetosDto } from "../../core/ports/driver/tweetos.dtos";



export const createTweetosService = async (createTweetosTask: CreateTweetosTask, requestBody: ICreateTweetosRequestDto): Promise<{tweetos: TweetosDto, token: string}> => {
    try{          
        const createTweetosRequestDto = new CreateTweetosRequestDto(requestBody);
        const response = await createTweetosTask.execute(createTweetosRequestDto);
        return response;
    }catch(e: any){ 
        throw e;        
    }
}
