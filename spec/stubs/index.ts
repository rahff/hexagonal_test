import { Tweet } from "../../src/domain/models/tweet";
import { Task } from "../../src/domain/ports/api";
import { FakeTweet } from "../infra/database/data";



export const createTweetTask: Task<Tweet> = {
    execute: ()=> new Promise((resolve) => resolve(FakeTweet)) 
}