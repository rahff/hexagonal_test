import { Tweet } from "../../../src/domain/models/tweet"
import { Tweetos } from "../../../src/domain/models/tweetos";
import { CreateTweet } from "../../../src/domain/use-cases/create-tweet";
import { TweetRepository } from "../../../src/infra/adapters/database/repositories/inMemory/tweet-repository"
import { TweetosRepository } from "../../../src/infra/adapters/database/repositories/inMemory/tweetos-repository";
import { Repository } from "../../../src/domain/ports/repositories"
import { FakeTweetos } from "../../infra/database/data";

describe('CreateTweetRequest', ()=>{

    let tweetRepository: Repository<Tweet>;
    let tweetosRepository: Repository<Tweetos>;
    let createTweetFeature: CreateTweet

     beforeEach(()=>{
        tweetRepository = new TweetRepository();
        tweetosRepository = new TweetosRepository();
        createTweetFeature = new CreateTweet(tweetRepository, tweetosRepository);
     });

     it('should create a new tweet', async ()=> {
        const tweetos = await tweetosRepository.create(FakeTweetos);
        const tweet = await createTweetFeature.execute({content: "Hello world", tweetosId: '123'});
        const expectedTweet = await tweetRepository.findById(tweet.getId());
        expect(expectedTweet?.getContent()).toEqual(tweet.getContent());
     })

     it('should throw an erro if the tweetos s tweet does not exist', async ()=> {
        try {
            const tweet = await createTweetFeature.execute({content: "Hello world", tweetosId: '123'});
            const expectedTweet = await tweetRepository.findById(tweet.getId());
            expect(expectedTweet).toBeNull();
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("tweetos does not exist")
        }
     })
})