import { LikeTweetFeature } from "../../../src/infra/injectors/like-tweet-feature";
import { LikeTweet } from "../../../src/domain/modules/like-tweet.module";



describe("Like a Tweet", ()=>{
    beforeAll(()=> console.log("\nLike a Tweet"));
    let likeTweetFeature: LikeTweet;

    beforeEach(()=>{
        likeTweetFeature = LikeTweetFeature()
    })

    it('should increase likes of a particular tweet', async ()=>{
        const likedTweet = await likeTweetFeature.execute({tweetId: "045042303211111111111111"});
        expect(likedTweet.likes).toBe(9)
    })

    it('should throw an error if the tweet does not exist', async ()=> {
        try {
            const likedTweet = await likeTweetFeature.execute({tweetId: "44585"});
            expect(likedTweet).toBeNull();
        } catch (error: any) {
            expect(error.message).toBe("this tweet does not exist");
        }
    })
})