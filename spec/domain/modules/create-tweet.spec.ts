
import { CreateTweet } from "../../../src/domain/modules/create-tweet.module";
import { CreateTweetFeature } from "../../../src/infra/injectors/create-tweet-feature";



describe('CreateTweetRequest', ()=>{

   beforeAll(()=> console.log("\nCreateTweetRequest"))

    let createTweetFeature: CreateTweet

     beforeEach(()=>{
        createTweetFeature = CreateTweetFeature();
     });

     it('should create a new tweet', async ()=> {
        const tweet = await createTweetFeature.execute({content: "Hello world", tweetosId: "123456789111111111111111"});
         expect(tweet).toBeTruthy();
     })

     it('should throw an error if the tweetos s tweet does not exist', async ()=> {
        try {
            const tweet = await createTweetFeature.execute({content: "Hello world", tweetosId: '123'});
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("tweetos does not exist")
        }
     })
})