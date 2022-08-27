import { DBMongo } from "../../../src/infra/database";
import { CreateTweet } from "../../../src/core/app/features/create-tweet.feature";
import { mongoUrl, tweetosIdRef } from "../../infra/database/data";
import { CreateTweetModule } from "../../../src/core/app/modules/createTweet.module";
import { TweetRepository } from "../../../src/infra/adapters/repositories/tweet-repository";




describe('CreateTweetRequest', ()=> {

   const db = new DBMongo(mongoUrl, "tweet");
   beforeAll(async ()=> {
      console.log("\nCreateTweetRequest");
      await db.start();
   })

    let createTweetFeature: CreateTweet;
    let tweetRepository: TweetRepository = new TweetRepository(db.getTweetCollection());

     beforeEach(()=>{
        createTweetFeature = CreateTweetModule.forTesting();
     });

     it('should create a new tweet', async ()=> {
        const tweet = await createTweetFeature.execute({content: "Hello world", tweetosId: tweetosIdRef});
        const expectedTweet = await tweetRepository.findOne({_id: tweet._id})
         expect(tweet).toBeTruthy();
         expect(expectedTweet?.content).toBe("Hello world");
         expect(expectedTweet?.tweetos._id).toBe(tweetosIdRef);
     })

     it('should throw an error if the tweetos s tweet does not exist', async ()=> {
        try {
            const tweet = await createTweetFeature.execute({content: "Hello world", tweetosId: '123'});
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("tweetos does not exist")
        }
     })

     afterAll(async ()=> {
      await db.destroy();
      console.log("\nclient closed");
  });
})