import { CreateTweet } from "../../domain/use-cases/create-tweet";
import { TweetosModel } from "../adapters/database/models/inMemory/tweetos.model";
import { Repository } from "../../domain/ports/out/repositories";
import { TweetModel } from "../adapters/database/models/inMemory/tweet.model";



export function CreateTweetFeature(tweetRepository: Repository<TweetModel>, tweetosRepository: Repository<TweetosModel>): CreateTweet {
   return new CreateTweet(tweetRepository,tweetosRepository);
}