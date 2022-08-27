import { FakeTweetos } from "../../infra/database/data";
import { CoreAuthService } from "../../../src/core/services/auth.service";
import { JwtService } from "../../../src/infra/services/jwt.service";
import { JwtPayload } from 'jsonwebtoken'



describe('AuthService', ()=>{
    beforeAll(()=> console.log("\nAuthService"));
    let jwtService: JwtService
    beforeEach(() => {
        jwtService = new JwtService()
    })

    it('should make a jwt token for a given user', ()=> {
        const token = CoreAuthService.makeTokenForGivenTweetos(FakeTweetos.getTweetosDto())
        const decodedToken: JwtPayload = jwtService.decodeToken(token);
        expect(decodedToken?._id).toBe(FakeTweetos._id);
        expect(decodedToken?.email).toBe(FakeTweetos.email);
    })
})