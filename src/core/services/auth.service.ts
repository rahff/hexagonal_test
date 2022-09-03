import { TweetosDto } from "../ports/driver/tweetos.dtos";
import { sign } from "jsonwebtoken";
import { jwtSecret } from "../../constants";


export class CoreAuthService {

    static makeTokenForGivenTweetos(tweetos: TweetosDto): any {
        const { email, _id } = tweetos;
        return sign({sub: _id, email }, jwtSecret);
    }
}