import { TweetDto } from "../../domain/modules/ports/driver/tweet.dto";
import { TweetosDto } from "../../domain/modules/ports/driver/tweetos.dtos";

export const TweetInMemoryDB: TweetDto[] = [
    {_id: "045042303211111111111111", content: "Hello MichMich !", likes: 8, tweetos: {_id: "123456789111111111111111", avatar: "", email: "elonMusk@gmail.com", followers: [], username: "Elon Musk"}},
    {_id: "045042303311111111111111", content: "Hello Jacky !", likes: 14, tweetos: {_id: "456", avatar: "", email: "guygeorges@gmail.com", followers: [], username: "Guy Georges"}}];

export const TweetosInMemoryDB: TweetosDto[] = [{_id: "123456789111111111111111", avatar: "", email: "elonMusk@gmail.com", followers: [], username: "Elon Musk"}, {_id: "123456787111111111111111", avatar: "", email: "guygeorges@gmail.com", followers: [], username: "Guy Georges"}]