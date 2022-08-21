import { TweetosRepository } from "../../../src/infra/adapters/database/repositories/inMemory/tweetos-repository";
import { FakeTweetos } from "../../infra/database/data";
import { CreateTweetos } from "../../../src/domain/use-cases/create-tweetos";
import { CreateTweetosRequestDto } from "../../../src/domain/ports/in/dtos";
import { createTweetosRequest } from "../../stubs/index"
import { Repository } from "../../../src/domain/ports/out/repositories";
import { TweetosModel } from "../../../src/infra/adapters/database/models/tweetos.model";


describe('CreateTweetosRequest', ()=>{

   beforeAll(()=> console.log("\nCreateTweetosRequest"))
    let tweetosRepository: Repository<TweetosModel>;
    let createTweetosFeature: CreateTweetos
    let createTweetosRequestDto: CreateTweetosRequestDto = new CreateTweetosRequestDto(createTweetosRequest);

     beforeEach(()=>{
        tweetosRepository = new TweetosRepository();
        createTweetosFeature = new CreateTweetos(tweetosRepository);
     });

     it('should create a new tweetos', async ()=> {
        const tweetos = await createTweetosFeature.execute(createTweetosRequestDto);
        const expectedTweetos = await tweetosRepository.findOneBy({_id: tweetos._id});
        expect(expectedTweetos?.username).toEqual(tweetos.username);
     })

     it('should throw an error if the tweetos s email already exist', async ()=> {
        try {
            const tweetosAlReadyExist = await tweetosRepository.save(FakeTweetos)
            const tweetos = await createTweetosFeature.execute(createTweetosRequestDto);
            expect(tweetos).toBeNull();
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("email already exist")
        }
     })
})