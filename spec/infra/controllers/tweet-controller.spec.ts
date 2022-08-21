import { Application } from "express";
import { Server } from "http";
import { createApplication, startServer } from "../../../src/infra/www/bootstrap";
import { agent } from 'supertest'
import { ICreateTweetosRequestDto, ICreateTweetRequestDto, LikeTweetRequestDto } from "../../../src/domain/ports/in/dtos";
import { TweetosRepository } from "../../../src/infra/adapters/database/repositories/inMemory/tweetos-repository";
import { FakeTweetos } from "../database/data";
import { Tweetos } from "../../../src/domain/models/tweetos";


describe('Tweet Controller integration', ()=>{

    beforeAll(()=> console.log("\nTweet Controller integration: \n"));

    let app: Application = createApplication()
    let server: Server = startServer(3001, app)
    let req = agent(app);

    describe("Create Tweet Request", ()=>{
        console.log("\nCreate Tweet Request");
        it("should return an error message because the tweetos does not exist", async ()=> {
            const createTweetRequestDto: ICreateTweetRequestDto = { content: "Hello world", tweetosId: "123" }
            const response = await req.post("/api/tweet").send(createTweetRequestDto);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ "error": "tweetos does not exist" });
        })

        // it("should return a 201 status code", async ()=> {
        //     const creatTweetosRequest: ICreateTweetosRequestDto = { username: "Tinitin", avatar: "", email: "tintindu92@gmail.com" }
        //     const createTweetosResponse = await req.post("/api/tweetos").send(creatTweetosRequest);
        //     expect(createTweetosResponse.status).toBe(201);
        //     const tweetos = createTweetosResponse.body as Tweetos;
        //     const createTweetRequestDto: ICreateTweetRequestDto = { content: "Hello world", tweetosId: tweetos.id }
        //     const response = await req.post("/api/tweet").send(createTweetRequestDto);            
        //     expect(response.status).toBe(201);
        // })
    })
    
    describe("Like a Tweet", ()=>{
        it('should return a 200 status code', ()=>{
            const likeTweetRequest: LikeTweetRequestDto = {tweetId: "noExistId"}
        })
    })

    afterAll(()=>{
        server.close(()=> console.log("\nserver closed"));
    })
})