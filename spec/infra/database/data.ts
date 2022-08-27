import { generateId } from "../../../src/core/app/utils";
import { Tweet } from "../../../src/core/models/tweet";
import { Tweetos } from "../../../src/core/models/tweetos";

export const FakeTweetos = new Tweetos(generateId(), "email"+123+"@gmail.com", "Elon Musk", "", [])
export const FakeTweet =  new Tweet(generateId(), "Hello World", FakeTweetos, 0)

export const FakeTweetos2 = new Tweetos("123", "email"+1278+"@gmail.com", "Elon Musk", "", [])
export const FakeTweet2 =  new Tweet("456", "Hello World", FakeTweetos2, 0)
export const mongoUrl = "mongodb://localhost:27017";
export const tweetIdRef = "8abe4234-2014-4be7-b5dd-70f511967fdb";
export const tweetIdRef2 = "93783d35-a7b4-4cb4-8069-d6e2dd603f4d";
export const tweetosIdRef = "aac2a54e-e8a0-4af8-802b-5d57db1edf4e";
export const tweetosIdRef2 = "0aee51bb-9ecd-4246-aa8d-7d60b6b896ec";