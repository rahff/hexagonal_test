import { createTweetosRequest } from "../../stubs/index"
import { CreateTweetos } from "../../../src/domain/features/create-tweetos.feature";
import { CreateTweetosRequestDto } from "../../../src/domain/ports/driver/tweetos.dtos";
import { DBMongo } from "../../../src/infra/database";
import { mongoUrl } from "../../infra/database/data";
import { generateRandom } from "../../../src/domain/utils";
import { CreateTweetosModule } from "../../../src/domain/modules/createTweetos.module";
import { AMQP } from "../../../src/infra/rmq/amqp";
import { TweetosRepository } from "../../../src/infra/adapters/repositories/tweetos-repository";



describe('CreateTweetosRequest', async ()=>{

   const db = new DBMongo(mongoUrl, "tweet");
   beforeAll(async ()=> {
      console.log("\nCreateTweetosRequest");
      await db.start();
   });

    let createTweetosFeature: CreateTweetos;
    let tweetosRepository: TweetosRepository
    let createTweetosRequestDto: CreateTweetosRequestDto = new CreateTweetosRequestDto({...createTweetosRequest, email: "michmichtest"+generateRandom()+"@gmail.com"});
    tweetosRepository = new TweetosRepository(db.getTweetosCollection());
     beforeEach(()=>{
        createTweetosFeature = CreateTweetosModule.forTesting();
     });

     it('should create a new tweetos', async ()=> {
        const tweetos = await createTweetosFeature.execute(createTweetosRequestDto);
        const expectedTweetos = await tweetosRepository.findOne({_id: tweetos._id})
        expect(expectedTweetos?.username).toEqual(tweetos.username);
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