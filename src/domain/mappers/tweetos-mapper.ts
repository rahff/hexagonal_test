import { TweetosModel } from "../../infra/adapters/database/models/inMemory/tweetos.model";
import { Tweetos } from "../models/tweetos";

export const fromModelToTweetos = (tweetosModel: TweetosModel): Tweetos => {
    return new Tweetos(tweetosModel.id, tweetosModel.email, tweetosModel.username, tweetosModel.avatar, tweetosModel.followers);
}