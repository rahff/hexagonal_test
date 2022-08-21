
import { TweetosModel } from "../../infra/adapters/database/models/tweetos.model";
import { Tweetos } from "../models/tweetos";

export const fromModelToTweetos = (tweetosModel: TweetosModel): Tweetos => {
    return new Tweetos(tweetosModel._id, tweetosModel.email, tweetosModel.username, tweetosModel.avatar, tweetosModel.followers);
}