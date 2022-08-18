import { Tweet } from "../../../src/domain/models/tweet"
import { Tweetos } from "../../../src/domain/models/tweetos"

describe('Tweet', ()=>{
    it('should create', ()=> {
        const tweetos = new Tweetos("147", "email123@gamil.com", "Elon Musk", "", [])
        const tweet = new Tweet("123", "Hello world", tweetos, 1, [])
        expect(tweet).toBeInstanceOf(Tweet);
    })

    it("should throw an error if the content is less than 3 or grather than 255 characters", ()=> {
        const tweetos = new Tweetos("147", "email123@gamil.com", "Elon Musk", "", [])
        const tweetFactory = () => new Tweet("123", "", tweetos, 1, [])
        expect(tweetFactory).toThrowError("invalid tweet");
    })

    it('should throw an error if the likes number is negative', ()=>{
        const tweetos = new Tweetos("147", "email123@gamil.com", "Elon Musk", "", [])
        const tweetFactory = () => new Tweet("123", "Hello World", tweetos, -1, [])
        expect(tweetFactory).toThrowError("negative number of likes");
    })
})