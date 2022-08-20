import { Tweet } from "../../../src/domain/models/tweet"
import { Tweetos } from "../../../src/domain/models/tweetos";
import { CreateTweet } from "../../../src/domain/use-cases/create-tweet";
import { TweetRepository } from "../../../src/infra/adapters/database/repositories/inMemory/tweet-repository"
import { TweetosRepository } from "../../../src/infra/adapters/database/repositories/inMemory/tweetos-repository";
import { FakeTweetos } from "../../infra/database/data";
import { TweetosModel } from "../../../src/infra/adapters/database/models/inMemory/tweetos.model";
import { Repository } from "../../../src/domain/ports/out/repositories";
import { TweetModel } from "../../../src/infra/adapters/database/models/inMemory/tweet.model";

describe('CreateTweetRequest', ()=>{

   beforeAll(()=> console.log("\nCreateTweetRequest"))
    let tweetRepository: Repository<TweetModel>;
    let tweetosRepository: Repository<TweetosModel>;
    let createTweetFeature: CreateTweet

     beforeEach(()=>{
        tweetRepository = new TweetRepository();
        tweetosRepository = new TweetosRepository();
        createTweetFeature = new CreateTweet(tweetRepository, tweetosRepository);
     });

     it('should create a new tweet', async ()=> {
        const tweetos = await tweetosRepository.create(FakeTweetos);
        const tweet = await createTweetFeature.execute({content: "Hello world", tweetosId: tweetos.id});
        const expectedTweet = await tweetRepository.findById(tweet.id);
        expect(expectedTweet?.content).toEqual(tweet.content);
     })

     it('should throw an error if the tweetos s tweet does not exist', async ()=> {
        try {
            const tweet = await createTweetFeature.execute({content: "Hello world", tweetosId: '123'});
            const expectedTweet = await tweetRepository.findById(tweet.id);
            expect(expectedTweet).toBeNull();
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("tweetos does not exist")
        }
     })
})