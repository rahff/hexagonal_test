import { TweetosDto } from "../../core/ports/driver/tweetos.dtos";

export interface TokenCheckDao {
    getTweetosById(_id: string): Promise<TweetosDto | null>;
}