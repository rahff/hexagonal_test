import { LikeTweetModule } from "../../../src/app/modules/likeTweet.module";
import { LikeTweet } from "../../../src/core/features/like-tweet.feature";
import { DBMongo } from "../../../src/infra/database";
import { mongoUrl, tweetIdRef } from "../../infra/database/data";
import { TweetRepository } from "../../../src/infra/adapters/repositories/tweet-repository";



describe("Like a Tweet", async ()=> {
    let tweetRepository: TweetRepository;
    const db = new DBMongo(mongoUrl, "tweet");
    let likeTweetFeature: LikeTweet;

    beforeAll(async ()=> {
       console.log("\nLikeTweetRequest");
       await db.start();
       tweetRepository = new TweetRepository(db.getTweetCollection());
    });

    beforeEach(()=>{
        likeTweetFeature = LikeTweetModule.forTesting();
    })

    it('should increase likes of a particular tweet', async ()=>{
        const tweetBefore = await tweetRepository.findOne({_id: tweetIdRef});
        if(tweetBefore) {
            const likesState = tweetBefore?.likes;
            const likedTweet = await likeTweetFeature.execute({tweetId: tweetIdRef});
            const expectedTweet = await tweetRepository.findOne({_id: likedTweet._id})
            expect(expectedTweet?.likes).toEqual(likesState + 1);
        }else{
            throw new Error("Like tweet: this tweet does not exist");
        }
    })

    it('should throw an error if the tweet does not exist', async ()=> {
        try {
            const likedTweet = await likeTweetFeature.execute({tweetId: "93781d35-a7b4-4cb5-8069-d6f2dd603f4d"});
            expect(likedTweet).toBeNull();
        } catch (error: any) {
            expect(error.message).toBe("this tweet does not exist");
        }
    })

    afterAll(async ()=> {
        await db.destroy();
        console.log("\nclient closed");
    });
})