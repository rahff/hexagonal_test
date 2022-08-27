import { TokenCheckDao } from "../interfaces";
import { JwtPayload, decode } from "jsonwebtoken"


export class TokenChecker {

    constructor(private tokenCheckDao: TokenCheckDao){}

    async isValidToken(token: string): Promise<boolean> {
        try {
            const jwtPayload: JwtPayload = decode(token) as JwtPayload;
            const foundedTweetos = await this.tokenCheckDao.getTweetosById(jwtPayload._id);
            if(!foundedTweetos) return false;
            return true;
        } catch (error) {
            throw error;
        }
    }
}
