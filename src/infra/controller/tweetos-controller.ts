import { Tweetos } from "../../domain/models/tweetos";
import { Task } from "../../domain/ports/in/api";
import { CreateTweetosRequestDto, ICreateTweetosRequestDto } from "../../domain/ports/in/dtos";


export const createtweetController = async (createTweetosTask: Task<Tweetos>, requestBody: ICreateTweetosRequestDto): Promise<Tweetos> => {
    try{          
        const createTweetosRequestDto = new CreateTweetosRequestDto(requestBody);
        const response = await createTweetosTask.execute(createTweetosRequestDto);
        return response;
    }catch(e: any){
        throw e;        
    }
}
