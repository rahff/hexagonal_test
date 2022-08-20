import { TweetModel } from "../../infra/adapters/database/models/inMemory/tweet.model";
import { Tweet } from "../models/tweet";
import { fromModelToTweetos } from "./tweetos-mapper";


export const fromModelToTweet = (tweetModel: TweetModel): Tweet => {
    return new Tweet(tweetModel.id, tweetModel.content, fromModelToTweetos(tweetModel.tweetos), tweetModel.likes, tweetModel.comments);
}