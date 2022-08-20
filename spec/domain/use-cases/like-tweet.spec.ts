import { LikeTweet } from "../../../src/domain/use-cases/like-tweet";
import { TweetRepository } from "../../../src/infra/adapters/database/repositories/inMemory/tweet-repository";
import { FakeTweet } from "../../infra/database/data";

describe("Like a Tweet", ()=>{
    beforeAll(()=> console.log("\nLike a Tweet"));
    let likeTweetFeature: LikeTweet;
    let tweetRepository: TweetRepository;

    beforeEach(()=>{
        tweetRepository = new TweetRepository()
        likeTweetFeature = new LikeTweet(tweetRepository)
    })

    it('should increase likes of a particular tweet', async ()=>{
        const tweet = await tweetRepository.create(FakeTweet);
        const likedTweet = await likeTweetFeature.execute({tweetId: FakeTweet.id});
        expect(tweet.id).toEqual(likedTweet.id);
        expect(tweet.likes).toBe(1);
    })

    it('should throw an error if the tweet does not exist', async ()=> {
        try {
            const likedTweet = await likeTweetFeature.execute({tweetId: FakeTweet.id});
            expect(likedTweet).toBeNull();
        } catch (error: any) {
            expect(error.message).toBe("this tweet does not exist");
        }
    })
})