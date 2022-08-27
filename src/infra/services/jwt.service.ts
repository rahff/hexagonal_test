import { JwtPayload, decode } from "jsonwebtoken"


export class JwtService {

    decodeToken(token: string): JwtPayload {
        const decodedToken = decode(token);
        if(!decodedToken) throw new Error("invalid token");
        return decodedToken as JwtPayload
    }
}