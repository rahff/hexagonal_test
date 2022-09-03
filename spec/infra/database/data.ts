import { generateId } from "../../../src/core/app/utils";
import { Tweet } from "../../../src/core/models/tweet";
import { Tweetos } from "../../../src/core/models/tweetos";

export const FakeTweetos = new Tweetos(generateId(), "email"+123+"@gmail.com", "Elon Musk", "", [])
export const FakeTweet =  new Tweet(generateId(), "Hello World", FakeTweetos, 0)

export const FakeTweetos2 = new Tweetos("123", "email"+1278+"@gmail.com", "Elon Musk", "", [])
export const FakeTweet2 =  new Tweet("456", "Hello World", FakeTweetos2, 0)
export const mongoUrl = "mongodb://localhost:27017";
export const tweetIdRef = "e4d5adda-0480-4228-8c17-6e626e5d9948";
export const tweetIdRef2 = "c9ce1b8c-2614-4c13-8dc2-17501bc02426";
export const tweetosIdRef = "2d4dd5cf-6e22-4386-9e83-67d936d72395";
export const tweetosIdRef2 = "02d68220-4e88-4b04-9a3e-db0172fa94d5";