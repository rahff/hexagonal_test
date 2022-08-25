
import { generateRandom, generateRandomString } from "../../src/domain/utils";
import { CreateTweetosRequestDto, ICreateTweetosRequestDto } from "../../src/domain/ports/driver/tweetos.dtos";


export const createTweetosRequest: CreateTweetosRequestDto = {
    avatar: "",
    email: "michoiutest"+generateRandom()+"@gmail.com",
    username:  generateRandomString(4)+" User"
}