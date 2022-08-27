import { TokenCheckerDaoAdapter } from "../../../infra/adapters/dao/token-checker-dao-adapter";
import { tweetosMongoRepository } from "../../../infra/adapters/repositories/tweetos-repository";
import { TokenChecker } from "../../../infra/services/tokenChecker.service";



export class JwtCheckerModule {

    static get(): TokenChecker {
        const tokenCheckerDao = new TokenCheckerDaoAdapter(tweetosMongoRepository);
        return new TokenChecker(tokenCheckerDao)
    }

    static forTesting(): TokenChecker {
        const tokenCheckerDao = new TokenCheckerDaoAdapter(tweetosMongoRepository);
        return new TokenChecker(tokenCheckerDao)
    }
}