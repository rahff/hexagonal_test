import { TweetosRepository } from "../../../src/infra/adapters/repositories/tweetos-repository";
import { DBMongo } from "../../../src/infra/database";
import { CoreAuthService } from "../../../src/core/services/auth.service";
import { JwtCheckerModule } from "../../../src/core/app/modules/jwtChecker.module";
import { TokenChecker } from "../../../src/infra/services/tokenChecker.service";
import { FakeTweetos, mongoUrl, tweetosIdRef } from "../database/data";
import { TweetosDto } from "../../../src/core/ports/driver/tweetos.dtos";



describe('AuthMiddleware', ()=> {

    beforeAll(()=> console.log("\nAuthMiddleware"));

    const db = new DBMongo(mongoUrl, "tweet");
    let tokenChecker: TokenChecker;
    let tweetosRepository: TweetosRepository;

    beforeEach(async ()=>{
        await db.start();
        tokenChecker = JwtCheckerModule.forTesting();
        tweetosRepository = new TweetosRepository(db.getTweetosCollection());
    })

    it('should check token validity on invalid tweetos', async ()=>{
        const invalidToken = CoreAuthService.makeTokenForGivenTweetos(FakeTweetos.getTweetosDto());
        const isValidToken = await tokenChecker.isValidToken(invalidToken);
        expect(isValidToken).toBeFalse();
    })

    it('should check token validity on valid tweetos', async ()=>{
        const validTweetos = await tweetosRepository.findOne({_id: tweetosIdRef});
        const validToken = CoreAuthService.makeTokenForGivenTweetos(validTweetos as TweetosDto);
        const isValidToken = await tokenChecker.isValidToken(validToken);
        expect(isValidToken).toBeTrue();
    })

    afterAll(() => db.destroy());
})