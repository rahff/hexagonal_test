import { TweetosDto } from "../driver/tweetos.dtos";

export interface CreateTweetosDao {
    saveTweetos(data: TweetosDto): Promise<TweetosDto>;
    findTweetosByEmail(email: string): Promise<TweetosDto | null>;
}