
import { generateRandom, generateRandomString } from "../../src/app/utils";
import { CreateTweetosRequestDto, ICreateTweetosRequestDto } from "../../src/core/ports/driver/tweetos.dtos";


export const createTweetosRequest: CreateTweetosRequestDto = {
    avatar: "",
    email: "michoiutest"+generateRandom()+"@gmail.com",
    username:  generateRandomString(4)+" User"
}