import { Repository } from "../ports/repositories";
import { Tweet } from "../models/tweet";
import { Tweetos } from "../models/tweetos";
import { CreateTweet } from "../use-cases/create-tweet";


export function CreateTweetFeature(tweetRepository: Repository<Tweet>, tweetosRepository: Repository<Tweetos>): CreateTweet {
    const feature = new CreateTweet(tweetRepository,tweetosRepository)
    return feature;
}