import { Repository } from "../../domain/ports/out/repositories";
import { LikeTweet } from "../../domain/use-cases/like-tweet";
import { TweetModel } from "../adapters/database/models/inMemory/tweet.model";

export function CreateLikeTweetFeature(tweetRepository: Repository<TweetModel>): LikeTweet{
    return new LikeTweet(tweetRepository);
}