import { Tweet } from "../../../src/core/models/tweet"
import { Tweetos } from "../../../src/core/models/tweetos"
import { FakeTweet, FakeTweetos } from "../../infra/database/data"

describe('Tweet', ()=>{

    beforeAll(()=> console.log("\nTweet Domain Model"))

    it('should create', ()=> {
        const tweet = new Tweet("123", "Hello world", FakeTweetos, 1)
        expect(tweet).toBeInstanceOf(Tweet);
    })

    it("should throw an error if the content is less than 3 or grather than 255 characters", ()=> {
        const tweetFactory = () => new Tweet("123", "", FakeTweetos, 1)
        expect(tweetFactory).toThrowError("invalid tweet");
    })

    it('should throw an error if the likes number is negative', ()=>{
        const tweetFactory = () => new Tweet("123", "Hello World", FakeTweetos, -1)
        expect(tweetFactory).toThrowError("negative number of likes");
    })
})