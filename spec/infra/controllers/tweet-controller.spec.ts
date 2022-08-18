import { Application } from "express";
import { Server } from "http";
import { TweetController } from "../../../src/infra/controller/tweet-controller"
import { createApplication, startServer } from "../../../src/infra/www/functions";
import { createTweetTask } from "../../stubs"
import { agent } from 'supertest'
import { ICreateTweetRequestDto } from "../../../src/domain/ports/dtos";


describe('Tweet Controller', ()=>{

    let app: Application = createApplication()
    let server: Server = startServer(3001, app)
    let req = agent(app)
    
    it("should return an error message because the tweetos does not exist", async ()=> {
        const createTweetRequestDto: ICreateTweetRequestDto = { content: "Hello world", tweetosId: "123" }
        const response = await req.post("/api/tweet").send(createTweetRequestDto);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ "error": "tweetos does not exist" });
    })

    beforeAll(()=>{
        server.close(()=> console.log("\nserver closed"));
    })
})