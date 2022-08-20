import { Application } from "express";
import { Server } from "http";
import { agent } from "supertest";
import { ICreateTweetosRequestDto } from "../../../src/domain/ports/in/dtos";
import { createApplication, startServer } from "../../../src/infra/www/functions";

describe('Tweetos Controller integration', ()=>{
    beforeAll(()=> console.log("\n Tweetos Controller integration\n"));

    let app: Application = createApplication()
    let server: Server = startServer(3002, app)
    let req = agent(app);

    describe('Create Tweetos Request', ()=>{
        console.log("\nCreate Tweetos Request\n");
        it('should create a new tweetos', async ()=>{
            const creatTweetosRequest: ICreateTweetosRequestDto = { username: "Tinitin", avatar: "", email: "tintindu93@gmail.com" }
            const createTweetosResponse = await req.post("/api/tweetos").send(creatTweetosRequest);
            expect(createTweetosResponse.status).toBe(201)
        })
    })

    afterAll(()=>{
        server.close(()=> console.log("\nserver closed"));
    })
})