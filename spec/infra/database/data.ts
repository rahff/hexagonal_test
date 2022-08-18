import { Tweet } from "../../../src/domain/models/tweet";
import { Tweetos } from "../../../src/domain/models/tweetos";

export const FakeTweetos = new Tweetos("123", "email123@gmail.com", "Elon Musk", "", [])
export const FakeTweet =  new Tweet("123", "Hello World", FakeTweetos, 0, [])