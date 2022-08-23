import { FakeTweetos } from "../../infra/database/data";
import { createTweetosRequest } from "../../stubs/index"
import { CreateTweetos } from "../../../src/domain/modules/create-tweetos.module";
import { CreateTweetosRequestDto } from "../../../src/domain/modules/ports/driver/tweetos.dtos";
import { CreateTweetosFeature } from "../../../src/infra/injectors/create-tweetos-feature";


describe('CreateTweetosRequest', ()=>{

   beforeAll(()=> console.log("\nCreateTweetosRequest"));
    let createTweetosFeature: CreateTweetos
    let createTweetosRequestDto: CreateTweetosRequestDto = new CreateTweetosRequestDto(createTweetosRequest);

     beforeEach(()=>{
        createTweetosFeature = CreateTweetosFeature();
     });

     it('should create a new tweetos', async ()=> {
        const tweetos = await createTweetosFeature.execute(createTweetosRequestDto);
        expect(tweetos.username).toEqual(tweetos.username);
     })

     it('should throw an error if the tweetos s email already exist', async ()=> {
        try {
            const tweetos = await createTweetosFeature.execute({...createTweetosRequestDto, email: "elonMusk@gmail.com"});
            expect(tweetos).toBeNull();
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("email already exist")
        }
     })
})