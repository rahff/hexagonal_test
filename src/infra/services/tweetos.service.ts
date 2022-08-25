import { CreateTweetosTask } from "../../domain/ports/driver/api";
import { CreateTweetosRequestDto, ICreateTweetosRequestDto, TweetosDto } from "../../domain/ports/driver/tweetos.dtos";



export const createTweetosService = async (createTweetosTask: CreateTweetosTask, requestBody: ICreateTweetosRequestDto): Promise<TweetosDto> => {
    try{          
        const createTweetosRequestDto = new CreateTweetosRequestDto(requestBody);
        const response = await createTweetosTask.execute(createTweetosRequestDto);
        return response;
    }catch(e: any){ 
        throw e;        
    }
}
