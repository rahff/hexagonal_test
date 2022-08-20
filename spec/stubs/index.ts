import { Tweet } from "../../src/domain/models/tweet";
import { Task } from "../../src/domain/ports/in/api";
import { CreateTweetosRequestDto } from "../../src/domain/ports/in/dtos";
import { FakeTweet } from "../infra/database/data";



export const createTweetTask: Task<Tweet> = {
    execute: ()=> new Promise((resolve) => resolve(FakeTweet)) 
}

export const createTweetosRequest: CreateTweetosRequestDto = {
    avatar: "",
    email: "email123@gmail.com",
    username: "Elon Musk"
}