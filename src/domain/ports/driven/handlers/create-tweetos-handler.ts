import { TweetosDto } from "../../driver/tweetos.dtos";



export interface CreateTweetosProducerEvent  {
    sendToQueue(createTweetosEvent: TweetosDto): void
}