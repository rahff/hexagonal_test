import { generateId } from "../../../src/domain/utils";
import { Tweet } from "../../../src/domain/models/tweet";
import { Tweetos } from "../../../src/domain/models/tweetos";

export const FakeTweetos = new Tweetos(generateId(), "email"+123+"@gmail.com", "Elon Musk", "", [])
export const FakeTweet =  new Tweet(generateId(), "Hello World", FakeTweetos, 0)

export const FakeTweetos2 = new Tweetos("123", "email"+1278+"@gmail.com", "Elon Musk", "", [])
export const FakeTweet2 =  new Tweet("456", "Hello World", FakeTweetos2, 0)