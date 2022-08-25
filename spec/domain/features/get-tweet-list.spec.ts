import { mongoUrl } from "../../infra/database/data";
import { DBMongo } from "../../../src/infra/database";
import { GetTweetList } from "../../../src/core/features/get-tweet-list.feature";
import { GetTweetListModule } from "../../../src/app/modules/getTweetList.module";


describe('GetTweetList', ()=> {
    let getTweetList: GetTweetList;
    const db = new DBMongo(mongoUrl, "tweet");
    beforeAll(async ()=> {
        console.log("\nGetTweetList");
        await db.start();
        getTweetList = GetTweetListModule.forTesting();
    })

    it('should get a list of tweet', async ()=>{
        const tweetList = await getTweetList.get({});
        expect(tweetList.length).toBe(10);
    })

    afterAll( async()=>{
        await db.destroy();
        console.log("\nclient closed");
    })
})