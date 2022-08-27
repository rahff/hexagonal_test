import { TweetosDto } from "../ports/driver/tweetos.dtos";
import { sign } from "jsonwebtoken";
import { jwtSecret } from "../../constants";


export class CoreAuthService {

    static makeTokenForGivenTweetos(tweetos: TweetosDto): any {
        const {_id, email } = tweetos;
        return sign({_id, email }, jwtSecret);
    }
}