
import { TweetModel } from "../../infra/adapters/database/models/tweet.model";
import { Tweet } from "../models/tweet";
import { fromModelToTweetos } from "./tweetos-mapper";
import { Comment } from "../models/comment"

export const fromModelToTweet = (tweetModel: TweetModel): Tweet => {
    return new Tweet(tweetModel._id, tweetModel.content, fromModelToTweetos(tweetModel.tweetos), tweetModel.likes, tweetModel.comments as Comment[]);
}