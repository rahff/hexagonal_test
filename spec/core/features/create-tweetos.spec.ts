import { createTweetosRequest } from "../../stubs/index"
import { CreateTweetos } from "../../../src/core/app/features/create-tweetos.feature";
import { CreateTweetosRequestDto } from "../../../src/core/ports/driver/tweetos.dtos";
import { DBMongo } from "../../../src/infra/database";
import { mongoUrl } from "../../infra/database/data";
import { generateRandom, generateRandomString } from "../../../src/core/app/utils";
import { CreateTweetosModule } from "../../../src/core/app/modules/createTweetos.module";
import { TweetosRepository } from "../../../src/infra/adapters/repositories/tweetos-repository";
import { CoreAuthService } from "../../../src/core/services/auth.service";



describe('CreateTweetosRequest', ()=>{

   const db = new DBMongo(mongoUrl, "tweet");
   beforeAll(async ()=> {
      console.log("\nCreateTweetosRequest");
      await db.start();
   });

    let createTweetosFeature: CreateTweetos;
    let tweetosRepository: TweetosRepository
    let createTweetosRequestDto: CreateTweetosRequestDto = new CreateTweetosRequestDto({...createTweetosRequest, email: generateRandomString(5)+generateRandom()+"@gmail.com"});
    tweetosRepository = new TweetosRepository(db.getTweetosCollection());
     beforeEach(()=>{
        createTweetosFeature = CreateTweetosModule.forTesting();
     });

     it('should create a new tweetos', async ()=> {
        const response = await createTweetosFeature.execute(createTweetosRequestDto);
        const expectedTweetos = await tweetosRepository.findOne({_id: response.tweetos._id})
        expect(expectedTweetos?.username).toEqual(response.tweetos.username);
        expect(response.token).toEqual(CoreAuthService.makeTokenForGivenTweetos(response.tweetos))
     })

     it('should throw an error if the tweetos s email already exist', async ()=> {
        try {
            const tweetos = await createTweetosFeature.execute({...createTweetosRequestDto, email: "tintindu92@gmail.com"});
            expect(tweetos).toBeNull();
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("email already exist")
        }
     })
     afterAll(async ()=> {
      await db.destroy();
      console.log("\nclient closed");
  });
})